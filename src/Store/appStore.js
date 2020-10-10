import { makeAutoObservable } from "mobx";
import { createContext, useContext } from 'react';

import { Caracter, FullCaracter } from '../Common/models/models';
import quickSort from '../Common/util/quickSort';

const appStore = () => {
  return makeAutoObservable ({
    species: [],
    caracters: [],
    fullList: [],
    list: [],
    listOptions: {
      sortBy: "",
      reverse: false,
      elementsPerPage: 10,
      page: 1,
      filter: "" 
    },
    editCaracter(fullCaracter){      

      const index = this.caracters.findIndex(e => e.id === fullCaracter.id);

      if(index === -1){
        return;
      }

      this.caracters[index] = new Caracter(fullCaracter.id, fullCaracter.makeId, fullCaracter.name, fullCaracter.abrv);

      this.listOptions.filter = "";
      this.listOptions.page = 1;

      this.fillList();
    },
    fillList(){
      
      this.fullList = this.caracters.map( e => {
        const specieIndex = this.species.findIndex( x => x.id === e.makeId);           
        return new FullCaracter(e.id,this.species[specieIndex].id, this.species[specieIndex].name, this.species[specieIndex].abrv, e.name, e.abrv);
      });

      this.list = [...this.fullList];   
      
      if(this.listOptions.filter.length){
        this.filterList(this.listOptions.filter);
      }
      
      if(this.listOptions.sortBy){
        this.sortList();

        if(this.listOptions.reverse){
          this.sortReverse();
        }
      }    
    },    
    sortList(){    
      this.list = [...quickSort((this.list), this.listOptions.sortBy)];
    },
    sortReverse(){
      this.list.reverse();
    },
    setSort(sortParam){

      if(sortParam !== this.listOptions.sortBy){
        this.listOptions.sortBy = sortParam;
        this.listOptions.reverse = false;
        this.sortList();
      }else{
        this.listOptions.reverse = !this.listOptions.reverse;
        this.sortReverse();
      }      
    },
    setElements(numOfElements){

      if(numOfElements < 1){
        return;
      }
      this.listOptions.elementsPerPage = numOfElements;
      this.listOptions.page = 1;
    },
    setPage(action){

      const pageNum = new Map()
        .set("pageUp", this.listOptions.page + 1)
        .set("pageDown", this.listOptions.page - 1);

      const newPage = pageNum.get(action);

      if(newPage < 1 || newPage > Math.ceil(this.list.length / this.listOptions.elementsPerPage)){
        return;
      }

      this.listOptions.page = newPage;      

    },
    filterList(value){

      const regex = new RegExp(value, "gi");      
      const keys = Object
        .keys(new FullCaracter())
        .filter(key => key !== "id" && key !== "makeId");
        
      this.list = this.fullList.filter(e => {
        for (let param in e){
          
          if(!keys.includes(param)){
            continue;
          }
  
          if(e[param].match(regex)){
            return true;
          }
        }
        return false;
      });

      this.listOptions.filter = value;
      this.listOptions.page = 1;

      if(this.listOptions.sortBy !== ""){
        this.sortList();

        if(this.listOptions.reverse){
          this.sortReverse();
        }
      }      
    },
    getList(){         
      return  this.list.slice(
        this.listOptions.page * this.listOptions.elementsPerPage - this.listOptions.elementsPerPage,
        this.listOptions.page * this.listOptions.elementsPerPage
        );
    },
  });
};

const AppContext = createContext();

const useAppStore = () => useContext(AppContext);

export {
  appStore,
  AppContext,
  useAppStore
};
