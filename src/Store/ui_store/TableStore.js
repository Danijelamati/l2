import { makeObservable, observable, action } from 'mobx';

import firebase from '../../Common/util/firebase';

export default class TableStore {
    
    @observable list;

    constructor(RootStore){
        makeObservable(this);
        this.RootStore = RootStore;
        this.list = [];
    }

    @action
    setList(value){
        this.list = value;
    }

    async firstPage(){
        
        const { listOptions, mode } = this.RootStore.listPageStore;

        const db = firebase.firestore();
        let list = db
            .collection(mode)
            .orderBy(listOptions.orderBy);    
            
        if (listOptions.filter) {
          list = list.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
        }

        if (listOptions.reverse) {
            list = await list                
                .limitToLast(listOptions.elementsPerPage)
                .get();
                
            this.setList(list.docs.map((d) => ({ ...d.data() })).reverse());
        } else {
            list = await list                
                .limit(listOptions.elementsPerPage)
                .get();
          
            this.setList(list.docs.map((d) => ({ ...d.data() })));
        }           
    }

    async nextPage(value) {
        const { listOptions, mode } = this.RootStore.listPageStore;
    
        if(value < 1){
          return false;
        }
    
        if(value === 1){
          await this.firstPage();
          return true;
        }
              
        if (this.list.length < listOptions.elementsPerPage) {              
          return false;
        }   
    
        const db = firebase.firestore();
          
        let list = db.collection(mode);
    
        let nextList;
        
        if (listOptions.filter) {
          list = list.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
        }

        list = list
          .orderBy(listOptions.orderBy)
                  
        if(listOptions.reverse){
                   
          list = await list
            .endBefore(this.list[this.list.length - 1][listOptions.orderBy])
            .limitToLast(listOptions.elementsPerPage)
            .get();
                
          nextList = [...list.docs.map((d) => ({ ...d.data() }))].reverse();
        }else{
                    
          list = await list
            .startAfter(this.list[this.list.length - 1][listOptions.orderBy])
            .limit(listOptions.elementsPerPage)
            .get();
    
          nextList = [...list.docs.map((d) => ({ ...d.data() }))];
        }
    
        if (!nextList.length) {
          return false;
        }
    
        this.setList(nextList);
        return true;             
              
        }
    
      async prevPage(value) {
          const { listOptions, mode } = this.RootStore.listPageStore;
          
        if (value < 1) {
          return false;
        }
    
        if(value === 1){
          await this.firstPage() 
          return true;              
        }
              
        const db = firebase.firestore();
        let list = db.collection(mode);
        
        if (listOptions.filter) {
          list = list.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
        }

        list = list
          .orderBy(listOptions.orderBy)
    
        if(listOptions.reverse){
          list = await list.startAfter(this.list[0][listOptions.orderBy])
            .limit(listOptions.elementsPerPage)
            .get();
                 
          this.setList([...list.docs.map((d) => ({ ...d.data() }))].reverse());
        }else{
          list = await list                    
            .endBefore(this.list[0][listOptions.orderBy])
            .limitToLast(listOptions.elementsPerPage)
            .get();      
                   
          this.setList([...list.docs.map((d) => ({ ...d.data() }))]);
        } 
    
        return true;
      }
}