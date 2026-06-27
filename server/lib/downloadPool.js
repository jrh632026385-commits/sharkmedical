const DEFAULT_CONCURRENCY = 12;

let active = 0;
const waiters = [];

function pump() {
  while (active < DEFAULT_CONCURRENCY && waiters.length) {
    const next = waiters.shift();
    active++;
    next.run().finally(() => {
      active--;
      pump();
    });
  }
}

export function runInPool(task) {
  return new Promise((resolve, reject) => {
    waiters.push({
      run: async () => {
        try {
          resolve(await task());
        } catch (err) {
          reject(err);
        }
      }
    });
    pump();
  });
}
