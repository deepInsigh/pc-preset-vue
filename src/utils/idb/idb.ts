import { openDB, type IDBPDatabase } from 'idb';

export const dbPromise: Promise<IDBPDatabase<any>> = openDB('scm-resource', 1, {
  upgrade(db: IDBPDatabase<unknown>): void {
    const objectStores = [
      { name: 'sysSettings', keyPath: 'key' },
      { name: 'udfResource', keyPath: 'key' },
      { name: 'sysResource', keyPath: 'key' },
      { name: 'privateSyscode', keyPath: 'key' },
    ];

    objectStores.forEach(store => {
      if (!db.objectStoreNames.contains(store.name)) {
        const objectStore = db.createObjectStore(store.name, {
          keyPath: store.keyPath,
        });
        objectStore.createIndex('key', 'key', { unique: false });
      }
    });
  },
});

export async function get(
  table: string,
  query: IDBKeyRange | IDBValidKey,
): Promise<{ key: string; value: string }> {
  return (await dbPromise).get(table, query);
}

export async function set(table: string, value: any): Promise<IDBValidKey> {
  return (await dbPromise).put(table, value);
}

export async function del(table: string, key: string): Promise<void> {
  return (await dbPromise).delete(table, key);
}

export async function clear(table: string): Promise<void> {
  return (await dbPromise).clear(table);
}

export async function keys(table: string): Promise<IDBValidKey[]> {
  return (await dbPromise).getAllKeys(table);
}

export async function getAll(
  table: string,
  query: IDBKeyRange | IDBValidKey,
): Promise<Array<{ key: string; value: string }>> {
  return (await dbPromise).getAll(table, query);
}
