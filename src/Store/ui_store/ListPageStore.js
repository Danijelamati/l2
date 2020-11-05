import { makeObservable, action, observable } from "mobx";

import { getWholeCollection } from "../../Common/util/firebaseUtils";

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
        await this.setSpecies();    
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

    @action
    selectSpecies(id){
        
        if(!id){
            return;
        }
       
        if(typeof this.listOptions.filter === "string"){     
            
            this.listOptions.filter = [this.RootStore.dropdownStore.findById(id)];
            this.listOptions.page = 1;
            this.RootStore.tableStore.firstPage(); 
            return;
        }
        
        const index = this.listOptions.filter.findIndex(e => e.id === id);

        if(index !== -1){  

            this.listOptions.filter.splice(index,1);
            if(this.listOptions.filter.length === 0){
                this.listOptions.filter = ""; 
            }
            this.listOptions.page = 1;
            this.RootStore.tableStore.firstPage(); 
            return;
        }
       
        if(this.listOptions.filter.length === 10){            
            this.listOptions.filter = [...this.listOptions.filter.slice(1), this.RootStore.dropdownStore.findById(id)];
        }else{
            this.listOptions.filter = [...this.listOptions.filter,this.RootStore.dropdownStore.findById(id)];
        }        
           
        this.listOptions.page = 1;
        this.RootStore.tableStore.firstPage(); 
    }

    async setSpecies(){  
        const collection = await getWholeCollection("species", "name");     
        await this.RootStore.dropdownStore.setDropdown(collection);        
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