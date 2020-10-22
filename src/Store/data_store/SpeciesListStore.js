import { makeObservable, observable, action } from "mobx";

import firebase from '../../Common/util/firebase';

export default class SpeciesListStore{

    @observable speciesList;

    constructor(RootStore){
        makeObservable(this);
        this.RootStore = RootStore;
        this.speciesList = [];
    }

    @action
    setSpecies(value){
        this.speciesList = value;
    }

    async firstPage(){
        
        const { listOptions } = this.RootStore.listPageStore;

        const db = firebase.firestore();
        let list = db
            .collection('species')
            .orderBy(listOptions.orderBy);    
            
        if (listOptions.filter) {
          list = list.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
        }

        if (listOptions.reverse) {
            list = await list                
                .limitToLast(listOptions.elementsPerPage)
                .get();
                
            this.setSpecies(list.docs.map((d) => ({ ...d.data() })).reverse());
        } else {
            list = await list                
                .limit(listOptions.elementsPerPage)
                .get();
          
            this.setSpecies(list.docs.map((d) => ({ ...d.data() })));
        }   
    }

    async nextPage(value) {
        const { listOptions } = this.RootStore.listPageStore;
    
        if(value < 1){
          return false;
        }
    
        if(value === 1){
          await this.firstPage();
          return true;
        }
              
        if (this.speciesList.length < listOptions.elementsPerPage) {              
          return false;
        }   
    
        const db = firebase.firestore();
          
        let list = db.collection('species');
    
        let nextList;
        
        if (listOptions.filter) {
          list = list.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
        }

        list = list
          .orderBy(listOptions.orderBy)
                  
        if(listOptions.reverse){
                   
          list = await list
            .endBefore(this.speciesList[this.speciesList.length - 1][listOptions.orderBy])
            .limitToLast(listOptions.elementsPerPage)
            .get();
                
          nextList = [...list.docs.map((d) => ({ ...d.data() }))].reverse();
        }else{
                    
          list = await list
            .startAfter(this.speciesList[this.speciesList.length - 1][listOptions.orderBy])
            .limit(listOptions.elementsPerPage)
            .get();
    
          nextList = [...list.docs.map((d) => ({ ...d.data() }))];
        }
    
        if (!nextList.length) {
          return false;
        }
    
        this.setSpecies(nextList);
        return true;             
              
        }
    
      async prevPage(value) {
          const { listOptions } = this.RootStore.listPageStore;
          
        if (value < 1) {
          return false;
        }
    
        if(value === 1){
          await this.firstPage() 
          return true;              
        }
              
        const db = firebase.firestore();
        let list = db.collection('species');
        
        if (listOptions.filter) {
          list = list.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
        }

        list = list
          .orderBy(listOptions.orderBy)
    
        if(listOptions.reverse){
          list = await list.startAfter(this.speciesList[0][listOptions.orderBy])
            .limit(listOptions.elementsPerPage)
            .get();
                 
          this.setSpecies([...list.docs.map((d) => ({ ...d.data() }))].reverse());
        }else{
          list = await list                    
            .endBefore(this.speciesList[0][listOptions.orderBy])
            .limitToLast(listOptions.elementsPerPage)
            .get();      
                   
          this.setSpecies([...list.docs.map((d) => ({ ...d.data() }))]);
        } 
    
        return true;
      }


}