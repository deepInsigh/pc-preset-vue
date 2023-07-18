import { openDB, deleteDB, IDBPDatabase } from 'idb';
import { getPrivateSyscode, getResource } from '@/api/public';
import { SelectOption, SelectOptions } from '@/hooks/useDictionary/types';
import { compact } from 'lodash-es';
import { SettingData } from './type';

const DBVERSION = 1;
// 从缓存中获取租户
const userName = window.localStorage.getItem('Ttid')! || 'GAVINT3';
export const DBNAME = `scm`;
// 资源表
export const storeResourceTable = 'resourceDic';
// 私有字典表
export const storePrivateSyscodeTable = 'privateSyscode';
// 系统配置表（保存着用户信息、资源版本、私有字典版本）
export const storeSysSettingsTable = 'sysSettings';

export const getOpenDB = async (): Promise<IDBPDatabase> => {
  const db = await openDB(DBNAME, DBVERSION, {
    upgrade(db) {
      const storeDict = db.createObjectStore(storeResourceTable, {
        keyPath: 'key',
      });
      const privateSyscodeDict = db.createObjectStore(storePrivateSyscodeTable, {
        keyPath: 'key',
      });
      const storeSysSettings = db.createObjectStore(storeSysSettingsTable, {
        keyPath: 'key',
      });
    },
  });
  return db;
};
const getDicts = (originDictData: Record<string, any>): Record<string, SelectOptions> => {
  const retObj = {};
  Object.keys(originDictData).forEach(key => {
    retObj[key] = [];
    if (originDictData[key]) {
      retObj[key] = originDictData[key].map(
        (item: Record<string, any>): SelectOption => ({
          label: item.codeName,
          value: item.codeID,
          resourceKey: item.resourceKey,
        }),
      );
    }
  });
  return retObj;
};
export async function saveData(tableName: string, data: any): Promise<void> {
  const db = await openDB(DBNAME, DBVERSION);
  const tx = db.transaction(tableName, 'readwrite');
  const store = tx.objectStore(tableName);
  await store.put(data);
  await tx.oncomplete;
}
// 批量存储
export async function saveDataBatch(tableName: string, data: any): Promise<void> {
  const db = await openDB(DBNAME, DBVERSION);
  const tx = db.transaction(tableName, 'readwrite');
  const store = tx.objectStore(tableName);
  const savePromises = Object.keys(data).map(key => {
    return store.put({ key: key, value: data[key] });
  });
  await Promise.all(savePromises);
  await tx.oncomplete;
}

// 批量获取数据
export async function getBatchDataByKeys<T>(tableName: string, keys: string[]): Promise<T[]> {
  const db = await openDB(DBNAME, DBVERSION);
  const tx = db.transaction(tableName, 'readonly');
  const store = tx.objectStore(tableName);
  const getPromises = keys.map(key => {
    return store.get(key);
  });
  const data = await Promise.all(getPromises);
  await tx.oncomplete;
  return compact<T>(data);
}
export async function getData<T>(tableName: string, key: string | number): Promise<T> {
  const db = await openDB(DBNAME, DBVERSION);
  const tx = db.transaction(tableName, 'readonly');
  const store = tx.objectStore(tableName);
  const data = await store.get(key);
  await tx.oncomplete;
  return data;
}

export async function clearTableData(tableName: string): Promise<void> {
  const db = await openDB(DBNAME, DBVERSION);
  const tx = db.transaction(tableName, 'readwrite');
  const store = tx.objectStore(tableName);
  store.clear();
  await tx.oncomplete;
}
export async function deleteData(tableName: string, key: number | string): Promise<void> {
  const db = await openDB(DBNAME, DBVERSION);
  const tx = db.transaction(tableName, 'readwrite');
  const store = tx.objectStore(tableName);
  await store.delete(key);
  await tx.oncomplete;
}

export async function createIdbAndAddData(isSameUser: boolean): Promise<void> {
  console.log({ isSameUser });
  const db = await getOpenDB();
  // 存储用户数据
  const txSysSettings = db.transaction(storeSysSettingsTable, 'readwrite');
  const storeSysSettings = txSysSettings.objectStore(storeSysSettingsTable);
  await storeSysSettings.put({
    key: 'userName',
    value: userName,
  });
  await txSysSettings.oncomplete;

  await handleResourceByDB(db, isSameUser);
  await handlePrivateSyscodeByDB(db, isSameUser);
}

// 处理存储国际化字段功能
async function handleResourceByDB(db: IDBPDatabase, isSameUser: boolean): Promise<void> {
  let resourceVersion = '';
  if (db.objectStoreNames.contains(storeSysSettingsTable)) {
    const resourceVersionData = await getData<SettingData>(
      storeSysSettingsTable,
      'resourceVersion',
    );
    if (resourceVersionData && resourceVersionData.value) {
      resourceVersion = resourceVersionData.value;
    }
  }
  const data: Record<string, any> | null = await getResource(resourceVersion);
  if (data) {
    if (!isSameUser) {
      // 存储国际化数据
      await saveDataBatch(storeResourceTable, data.resourceDic);
      // 存储资源版本
      await saveData(storeSysSettingsTable, {
        key: 'resourceVersion',
        value: data.resourceVersion,
      });
    } else {
      if (data.isChanged) {
        // 更新国际化数据
        await clearTableData(storeResourceTable);
        await saveDataBatch(storeResourceTable, data.resourceDic);
        // 更新系统设置信息
        await deleteData(storeSysSettingsTable, 'resourceVersion');
        await saveData(storeSysSettingsTable, {
          key: 'resourceVersion',
          value: data.resourceVersion,
        });
      }
    }
  }
}

// 处理私有字典存储功能
async function handlePrivateSyscodeByDB(db: IDBPDatabase, isSameUser: boolean): Promise<void> {
  // idb存储用户信息end
  let privateSyscodeVersion = '';
  if (db.objectStoreNames.contains(storeSysSettingsTable)) {
    const privateSyscodeVersionData = await getData<SettingData>(
      storeSysSettingsTable,
      'privateSyscodeVersion',
    );
    if (privateSyscodeVersionData && privateSyscodeVersionData.value) {
      privateSyscodeVersion = privateSyscodeVersionData.value;
    }
  }
  const data: Record<string, any> | null = await getPrivateSyscode(privateSyscodeVersion);
  if (data) {
    if (!isSameUser) {
      // 存储私有字典
      const dicts = getDicts(data.syscode);
      await saveDataBatch(storePrivateSyscodeTable, dicts);
      // 存储私有字典版本
      await saveData(storeSysSettingsTable, {
        key: 'privateSyscodeVersion',
        value: data.privateSyscodeVersion,
      });
    } else {
      if (data.isChanged) {
        // 更新私有字典数据
        await clearTableData(storePrivateSyscodeTable);
        const dicts = getDicts(data.syscode);
        await saveDataBatch(storePrivateSyscodeTable, dicts);
        // 更新私有字典版本
        await deleteData(storeSysSettingsTable, 'privateSyscodeVersion');
        await saveData(storeSysSettingsTable, {
          key: 'privateSyscodeVersion',
          value: data.privateSyscodeVersion,
        });
      }
    }
  }
}

export async function createDatabaseByCheckUser(): Promise<void> {
  console.log(`判断租户`);
  const db = await openDB(DBNAME, DBVERSION);
  // 无数据库
  if (!db.objectStoreNames.contains(storeSysSettingsTable)) {
    console.log(`执行无数据库`);
    await db.close();
    await deleteDB(DBNAME);
    await createIdbAndAddData(false);
    // 然后存储数据
  } else {
    // 有数据库有表
    const userData = await getData<SettingData>(storeSysSettingsTable, 'userName');
    // 租户不一致逻辑
    if (!userData || (userData && userData.value !== userName)) {
      console.log(`执行租户不一致逻辑`);
      await db.close();
      await deleteDB(DBNAME);
      await createIdbAndAddData(false);
    } else {
      // 租户一致逻辑
      await createIdbAndAddData(true);
    }
  }
}
