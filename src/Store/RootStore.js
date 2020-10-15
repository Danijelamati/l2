import { createContext, useContext } from 'react';

import ListStore from './ListStore';
import AppStore from './AppStore';

const RootContext = createContext();

const useRootStore = () => useContext(RootContext);

class RootStore {
  constructor() {
    this.listStore = ListStore(this);
    this.appStore = AppStore(this);
  }
}

export {
  RootContext,
  useRootStore,
  RootStore,
};
