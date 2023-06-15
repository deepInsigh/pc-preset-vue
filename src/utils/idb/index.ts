import { openDB } from 'idb';

const DB_NAME = 'admin-database';
const DB_VERSION = 1;
const STORE_NAME = 'dataDictionary';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

export async function saveData(data) {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.put(data);
  await tx.oncomplete;
  console.log(data);
}

export async function getData(id) {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const data = await store.get(id);
  await tx.oncomplete;
  return data;
}

export async function deleteData(id) {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.delete(id);
  await tx.oncomplete;
}
