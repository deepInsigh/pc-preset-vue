import indexdbWorker from './indexdb.worker?worker';

export { getAllResources } from './request';
export const workerInst: Worker = new indexdbWorker();
