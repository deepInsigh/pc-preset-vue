import type { Tab } from '@quantum-asia/qt-design/es/tabs-view';

export interface NavTab extends Tab {
  options: {
    fullPath: string;
    path: string;
    key: string;
    compName: string;
  };
}
