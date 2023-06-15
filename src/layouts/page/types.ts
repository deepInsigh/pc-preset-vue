import { Merge } from 'type-fest';
import type { MenuOption } from 'naive-ui';
import type { LocationQueryRaw } from 'vue-router';

export type MenuOptionItem = Merge<
  MenuOption,
  {
    query?: LocationQueryRaw;
    path: string;
  }
>;
