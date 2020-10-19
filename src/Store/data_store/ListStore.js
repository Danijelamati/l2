import { makeAutoObservable } from 'mobx';

import firebase from '../../Common/util/firebase';
    
    export default (RootStore) => makeAutoObservable({
        list: [],
        setList(newList) {
          this.list = [...newList];
        },
        async firstPage() {
         
            const { listOptions } = RootStore.listPageStore;
            const db = firebase.firestore();
            let ref = db
              .collection('list')
              .orderBy(listOptions.orderBy)
              .orderBy('id');
      
            if (listOptions.filter) {
              ref = ref.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
            }
      
            if (listOptions.reverse) {
              ref = await ref                
                .limitToLast(listOptions.elementsPerPage)
                .get();
      
              this.setList(ref.docs.map((d) => ({ ...d.data() })).reverse());
            } else {
              ref = await ref                
                .limit(listOptions.elementsPerPage)
                .get();
              this.setList(ref.docs.map((d) => ({ ...d.data() })));
            }
          return true;
          
        },
        async nextPage(value) {
          const { listOptions } = RootStore.listPageStore;

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
      
            let ref = db.collection('list');

            let nextList;
      
            if (listOptions.filter) {
              ref = ref.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
            }
      
            ref = ref
              .orderBy(listOptions.orderBy)
              .orderBy('id');
              
            if(listOptions.reverse){
               
              ref = await ref
                .endBefore(
                  this.list[this.list.length - 1][listOptions.orderBy],
                  this.list[this.list.length - 1].id,
                )
                .limitToLast(listOptions.elementsPerPage)
                .get();
            
                nextList = [...ref.docs.map((d) => ({ ...d.data() }))].reverse();
            }else{
                
              ref = await ref
                .startAfter(this.list[this.list.length - 1][listOptions.orderBy], this.list[this.list.length - 1].id)
                .limit(listOptions.elementsPerPage)
                .get();

                nextList = [...ref.docs.map((d) => ({ ...d.data() }))];
            }

            if (!nextList.length) {
                return false;
                }

            this.setList(nextList);
            return true;             
          
        },
        async prevPage(value) {
            const { listOptions } = RootStore.listPageStore;
      
            if (value < 1) {
                return false;
            }

            if(value === 1){
              await this.firstPage() 
              return true;              
            }
          
            const db = firebase.firestore();
      
            let ref = db.collection('list');
      
            if (listOptions.filter) {
                ref = ref.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
            }
      
            ref = ref
                .orderBy(listOptions.orderBy)
                .orderBy('id')

            if(listOptions.reverse){
                ref = await ref.startAfter(this.list[0][listOptions.orderBy], this.list[0].id)
                .limit(listOptions.elementsPerPage)
                .get();
             
                this.setList([...ref.docs.map((d) => ({ ...d.data() }))].reverse());
            }else{
                ref = await ref                    
                  .endBefore(this.list[0][listOptions.orderBy], this.list[0].id)
                  .limitToLast(listOptions.elementsPerPage)
                  .get();      
                
                this.setList([...ref.docs.map((d) => ({ ...d.data() }))]);
            } 
            return true;
        }
    });