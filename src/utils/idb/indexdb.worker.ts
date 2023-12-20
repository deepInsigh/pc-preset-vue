import { clear, dbPromise } from './idb';
import type { IDBPTransaction } from 'idb';

const setData = async (table: string, data: Record<string, any>): Promise<void> => {
  const tx: IDBPTransaction<any, [string], 'readwrite'> = (await dbPromise).transaction(
    table,
    'readwrite',
  );

  await Promise.all([
    ...Object.entries(data).map(([key, value]) =>
      tx.store.put({
        key,
        value,
      }),
    ),
    tx.done,
  ]);
};

async function updateData(key: string, value: any): Promise<void> {
  await clear(key);
  await setData(key, value);
}

self.addEventListener('message', async (event: MessageEvent<any>): Promise<void> => {
  const { data } = event.data;

  if (!data) return;

  if (data.sysResource?.isChanged) {
    const { resourceDic } = data.sysResource;
    await updateData('sysResource', resourceDic);
  }

  if (data.udfResource?.isChanged) {
    const { resourceDic } = data.udfResource;
    await updateData('udfResource', resourceDic);
  }

  if (data.privateSyscode?.isChanged) {
    const { syscode } = data.privateSyscode;
    await updateData('privateSyscode', syscode);
  }

  self.close();
});
