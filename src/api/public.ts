//获取所有数据字典
import { getAll } from '@/utils/idb/idb';
export async function getPrivateSyscode() {
  const data = await getAll(
    'privateSyscode',
    IDBKeyRange.bound('AMSROrderTypeSC', 'AMSRevocationReason'),
  );
  console.log('data', data);

  return [];
}
