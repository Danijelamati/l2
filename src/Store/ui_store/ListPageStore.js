import { makeAutoObservable } from "mobx";

const initialState = {
    orderBy: 'name',
    reverse: false,
    elementsPerPage: 10,
    page: 1,
    filter: '',
  };

export default (RootStore) => {  
    
    return makeAutoObservable({
        listOptions: {...initialState},
        loaded: false,
        async initialise(){
            await RootStore.listStore.firstPage();
            this.setLoaded(true);
        },
        setLoaded(value){
            this.loaded= value;
        },
        resetOptions() {
            this.listOptions = { ...initialState };
            RootStore.listStore.firstPage();
        },        
        setFilter(value) {
            this.listOptions.filter = value;
            this.listOptions.page = 1;
            RootStore.listStore.firstPage();
        },
        setElements(value) {
            if (value < 1 || !value) {
                return;
            }
            this.listOptions.elementsPerPage = value;
            this.setPage(1);
            RootStore.listStore.firstPage();
        },
        setOrderBy(sortParam) {
            if(!sortParam){
                return;
            }

            if (sortParam !== this.listOptions.orderBy) {
                this.listOptions.orderBy = sortParam;
                this.listOptions.reverse = false;
            } else {
                this.listOptions.reverse = !this.listOptions.reverse;
            }
            this.setPage(1);
            RootStore.listStore.firstPage();
        },
        setPage(value){
            this.listOptions.page = value;
        },
        async navigatePage(action,value) {            

            if(action === "nextPage"){
                const success = await RootStore.listStore.nextPage(value);
                if(success){
                    this.setPage(value);                    
                    return;
                }
                return;
            }

            if(action==="prevPage"){
                const success = await RootStore.listStore.prevPage(value);
                if(success){
                    this.setPage(value);
                }                
            }
            
            
        },

    });
}