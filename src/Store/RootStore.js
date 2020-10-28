import { createContext, useContext } from 'react';

import ListPageStore from './ui_store/ListPageStore';
import EditPageStore from './ui_store/EditPageStore';
import SpeciesStore from './data_store/SpeciesStore';
import EditCaracterStore from './data_store/EditCaracterStore';
import AddPageStore from './ui_store/AddPageStore';
import NewSpeciesStore from './data_store/NewSpeciesStore';
import NewCaracterStore from './data_store/NewCaracterStore';
import EditSpeciesStore from './data_store/EditSpeciesStore';
import TableStore from './ui_store/TableStore';

const RootContext = createContext();

const useRootStore = () => useContext(RootContext);

class RootStore {
  constructor() {
    
    this.listPageStore = new ListPageStore(this);
    this.tableStore = new TableStore(this);

    this.editPageStore = new EditPageStore(this);     
    this.editCaracterStore =  new EditCaracterStore(); 
    this.editSpeciesStore = new EditSpeciesStore();

    this.addPageStore = new AddPageStore(this);   
    this.newSpeciesStore = new NewSpeciesStore();
    this.newCaracterStore = new NewCaracterStore();

    this.speciesStore = new SpeciesStore();

  }
};

export {
  RootContext,
  useRootStore,
  RootStore,
};
