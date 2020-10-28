import { makeObservable, action, observable } from "mobx";

const initialState = {
    orderBy: 'id',
    reverse: false,
    elementsPerPage: 10,
    page: 1,
    filter: '',
  };

export default class ListPageStore{  
    
    
    @observable listOptions;
    @observable loaded;
    @observable mode;

    constructor(RootStore){
        makeObservable(this);
        this.RootStore = RootStore;
        this.listOptions = {...initialState};
        this.loaded = false;
        this.mode = "list";
    }
    
    @action
    async initialise(){
        await this.RootStore.tableStore.firstPage();
        this.setLoaded(true);
    }

    @action
    setLoaded(value){
        this.loaded= value;
    }

    @action
    setOptions(name,value){
        this.listOptions[name] = value;
    }    

    @action
    async resetOptions() {
        
        this.listOptions = { ...initialState };
        await this.RootStore.tableStore.firstPage();        
        
    }

    @action
    setFilter(value) {
        this.listOptions.filter = value;
        this.listOptions.page = 1;
       
        this.RootStore.tableStore.firstPage();
    }    

    @action
    setElements(value) {
        if (value < 1 || !value) {
            return;
        }
        this.listOptions.elementsPerPage = value;
        this.setPage(1);
        
        this.RootStore.tableStore.firstPage();
        
    }

    @action
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
        
        this.RootStore.tableStore.firstPage();            
        
    }

    @action
    setPage(value){
        this.listOptions.page = value;
    }

    @action
    setMode(value){
        this.mode = value;
    }

    async manageMode(value){

        if(this.mode === value){
            return;
        }
        this.RootStore.tableStore.setList([]);
        this.setMode(value);
        this.setOptions("filter", "");
        this.setOptions("page", 1);
        this.setOptions("reverse", false);
        this.setOptions("orderBy", "id");
     
        await this.RootStore.tableStore.firstPage();            
       
    }
    
    async navigatePage(action,value) {           
      
        if(action === "nextPage"){
            const success = await this.RootStore.tableStore.nextPage(value);
            if(success){
                this.setPage(value);                    
                return;
            }
            return;
        }
    
        if(action==="prevPage"){
            const success = await this.RootStore.tableStore.prevPage(value);
            if(success){
                this.setPage(value);
            }        
            return;        
        }
     
            
    }   
};