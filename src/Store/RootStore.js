import { createContext, useContext } from 'react';

import ListStore from './data_store/ListStore';
import ListPageStore from './ui_store/ListPageStore';
import EditPageStore from './ui_store/EditPageStore';
import SpeciesStore from './data_store/SpeciesStore';
import EditCaracterStore from './data_store/EditCaracterStore';

const RootContext = createContext();

const useRootStore = () => useContext(RootContext);

class RootStore {
  constructor() {
    this.listStore = ListStore(this);
    this.listPageStore = ListPageStore(this);
    this.editPageStore = EditPageStore(this); 
    this.speciesStore = SpeciesStore(this);
    this.editCaracterStore =  EditCaracterStore(this);
  }
}

export {
  RootContext,
  useRootStore,
  RootStore,
};
