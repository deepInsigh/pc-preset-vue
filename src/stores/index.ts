import { createPinia } from 'pinia';
import CreatePersistedState from 'pinia-plugin-persistedstate';

const store = createPinia();
store.use(CreatePersistedState);

export { store };
