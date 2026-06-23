/** 前台公开数据：保留全部疾病，仅剥离录入批次元数据（批次标签仅后台展示） */

function stripBatchFields(d) {
  if (!d || typeof d !== 'object') return d;
  const { entryBatch, entryBatchLabel, ...rest } = d;
  return rest;
}

export function toPublicSiteData(data) {
  if (!data || typeof data !== 'object') return data;
  return {
    ...data,
    diseases: (data.diseases || []).map(stripBatchFields)
  };
}
