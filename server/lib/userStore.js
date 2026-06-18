import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { canPersistWrites, isVercel, kvGet, kvSet } from './kv.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', '..');
const usersPath = path.join(root, 'data', 'users.json');
const KV_KEY = 'shark:users';

function hashPassword(password, salt) {
  return crypto.scryptSync(String(password), salt, 64).toString('hex');
}

function readUsersFile() {
  if (!fs.existsSync(usersPath)) return { users: [] };
  try {
    const data = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    if (!Array.isArray(data.users)) return { users: [] };
    return data;
  } catch {
    return { users: [] };
  }
}

async function readUsersData() {
  const fromKv = await kvGet(KV_KEY);
  if (fromKv && Array.isArray(fromKv.users)) return fromKv;
  return readUsersFile();
}

async function writeUsersData(data) {
  if (!canPersistWrites()) {
    const err = new Error('Vercel 上需连接 Vercel KV 才能注册新用户；管理员请使用环境变量 ADMIN_USERNAME / ADMIN_PASSWORD 登录');
    err.status = 503;
    throw err;
  }
  const saved = await kvSet(KV_KEY, data);
  if (saved) return data;
  const tmp = usersPath + '.tmp';
  fs.mkdirSync(path.dirname(usersPath), { recursive: true });
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmp, usersPath);
  return data;
}

export async function listUsers() {
  return (await readUsersData()).users;
}

export async function listPublicUsers() {
  const users = await listUsers();
  return users
    .map(publicUser)
    .filter(Boolean)
    .sort((a, b) => {
      const ta = a.createdAt === 'env' ? 0 : Date.parse(a.createdAt || 0) || 0;
      const tb = b.createdAt === 'env' ? 0 : Date.parse(b.createdAt || 0) || 0;
      return tb - ta;
    });
}

export async function findUserByUsername(username) {
  const name = String(username || '').trim().toLowerCase();
  return (await readUsersData()).users.find(u => u.username.toLowerCase() === name);
}

export async function findUserById(id) {
  const sid = String(id || '').trim();
  if (!sid) return null;
  return (await readUsersData()).users.find(u => u.id === sid) || null;
}

export function verifyUserPassword(user, password) {
  if (!user?.salt || !user?.passwordHash) return false;
  return user.passwordHash === hashPassword(password, user.salt);
}

export function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    email: user.email || '',
    role: user.role,
    isAdmin: user.role === 'admin',
    createdAt: user.createdAt
  };
}

function envAdminUser(username, password, bootstrapUsername, bootstrapPassword) {
  const u = String(username || '').trim();
  const p = String(password || '');
  const bu = String(bootstrapUsername || 'admin').trim();
  const bp = String(bootstrapPassword || '');
  if (!bu || !bp) return null;
  const bufA = Buffer.from(u);
  const bufB = Buffer.from(bu);
  const bufP = Buffer.from(p);
  const bufBP = Buffer.from(bp);
  if (bufA.length !== bufB.length || bufP.length !== bufBP.length) return null;
  if (!crypto.timingSafeEqual(bufA, bufB) || !crypto.timingSafeEqual(bufP, bufBP)) return null;
  return {
    id: 'env-admin',
    username: bu,
    email: '',
    role: 'admin',
    createdAt: 'env'
  };
}

export async function ensureBootstrapAdmin(username, password) {
  const data = await readUsersData();
  if (data.users.some(u => u.role === 'admin')) return null;
  if (isVercel() && !canPersistWrites()) return null;
  const salt = crypto.randomBytes(16).toString('hex');
  const admin = {
    id: crypto.randomUUID(),
    username: String(username || 'admin').trim(),
    email: '',
    salt,
    passwordHash: hashPassword(password, salt),
    role: 'admin',
    createdAt: new Date().toISOString()
  };
  data.users.push(admin);
  await writeUsersData(data);
  return admin;
}

export async function registerUser({ username, password, email, role = 'user' }) {
  return createStoredUser({ username, password, email, role });
}

export async function createStoredUser({ username, password, email, role = 'user' }) {
  const name = String(username || '').trim();
  const pass = String(password || '');
  const mail = String(email || '').trim();
  const userRole = role === 'admin' ? 'admin' : 'user';

  if (name.length < 3 || name.length > 32) {
    throw new Error('用户名需 3–32 个字符');
  }
  if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(name)) {
    throw new Error('用户名仅支持中文、字母、数字和下划线');
  }
  if (pass.length < 6) {
    throw new Error('密码至少 6 位');
  }
  if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    throw new Error('邮箱格式不正确');
  }

  const data = await readUsersData();
  if (data.users.some(u => u.username.toLowerCase() === name.toLowerCase())) {
    throw new Error('用户名已被注册');
  }
  if (mail && data.users.some(u => u.email && u.email.toLowerCase() === mail.toLowerCase())) {
    throw new Error('邮箱已被使用');
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const user = {
    id: crypto.randomUUID(),
    username: name,
    email: mail,
    salt,
    passwordHash: hashPassword(pass, salt),
    role: userRole,
    createdAt: new Date().toISOString()
  };
  data.users.push(user);
  await writeUsersData(data);
  return user;
}

export async function deleteUserById(id) {
  const sid = String(id || '').trim();
  if (!sid || sid === 'env-admin') {
    throw new Error('该账号无法删除');
  }

  const data = await readUsersData();
  const index = data.users.findIndex(u => u.id === sid);
  if (index < 0) {
    throw new Error('用户不存在');
  }

  const target = data.users[index];
  if (target.role === 'admin') {
    const adminCount = data.users.filter(u => u.role === 'admin').length;
    if (adminCount <= 1) {
      throw new Error('至少保留一名管理员，无法删除');
    }
  }

  data.users.splice(index, 1);
  await writeUsersData(data);
  return publicUser(target);
}

export async function updateUserRole(id, role) {
  const sid = String(id || '').trim();
  if (!sid || sid === 'env-admin') {
    throw new Error('该账号无法修改');
  }
  const userRole = role === 'admin' ? 'admin' : 'user';

  const data = await readUsersData();
  const user = data.users.find(u => u.id === sid);
  if (!user) {
    throw new Error('用户不存在');
  }
  if (user.role === 'admin' && userRole === 'user') {
    const adminCount = data.users.filter(u => u.role === 'admin').length;
    if (adminCount <= 1) {
      throw new Error('至少保留一名管理员，无法降级');
    }
  }
  user.role = userRole;
  await writeUsersData(data);
  return publicUser(user);
}

export async function authenticateUser(username, password, bootstrapUsername, bootstrapPassword) {
  const user = await findUserByUsername(username);
  if (user && verifyUserPassword(user, password)) return user;
  return envAdminUser(username, password, bootstrapUsername, bootstrapPassword);
}
