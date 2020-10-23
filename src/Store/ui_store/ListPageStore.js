import { makeObservable, action, observable } from "mobx";

const initialState = {
    orderBy: 'name',
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
        this.mode = "caracter";
    }
    
    @action
    async initialise(){
        await this.RootStore.listStore.firstPage();
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
        if(this.mode === "caracter"){
            this.listOptions = { ...initialState };
            await this.RootStore.listStore.firstPage();
            return;
        }
        if(this.mode === "species"){
            this.listOptions = { ...initialState };
            await this.RootStore.speciesListStore.firstPage();
            return;
        }
        
    }

    @action
    setFilter(value) {
        this.listOptions.filter = value;
        this.listOptions.page = 1;
        if(this.mode==="caracter"){
            this.RootStore.listStore.firstPage();
            return;
        }
        if(this.mode === "species"){
            this.RootStore.speciesListStore.firstPage();
            return; 
        }        
    }

    @action
    setElements(value) {
        if (value < 1 || !value) {
            return;
        }
        this.listOptions.elementsPerPage = value;
        this.setPage(1);
        if(this.mode==="caracter"){
            this.RootStore.listStore.firstPage();
            return;
        }
        if(this.mode==="species"){
            this.RootStore.speciesListStore.firstPage();
            return;
        }        
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

        if(this.mode==="caracter"){
            this.RootStore.listStore.firstPage();
            return;
        }
        if(this.mode==="species"){
            this.RootStore.speciesListStore.firstPage();
            return;
        } 
    }

    @action
    setPage(value){
        this.listOptions.page = value;
    }

    @action
    setMode(value){
        this.mode = value;
    }

    async menageMode(value){

        this.setMode(value);
        this.setOptions("filter", "");
        this.setOptions("page", 1);
        this.setOptions("reverse", false);
        this.setOptions("orderBy", "name");

        if(value==="caracter"){
            this.RootStore.speciesListStore.setSpecies([]);
            await this.RootStore.listStore.firstPage();            
        }
        if(value==="species"){
            this.RootStore.listStore.setList([]);
            await this.RootStore.speciesListStore.firstPage();            
        }       
        
        
    }
    
    async navigatePage(action,value) {   
        
        if(this.mode==="caracter"){
            if(action === "nextPage"){
                const success = await this.RootStore.listStore.nextPage(value);
                if(success){
                    this.setPage(value);                    
                    return;
                }
                return;
            }
    
            if(action==="prevPage"){
                const success = await this.RootStore.listStore.prevPage(value);
                if(success){
                    this.setPage(value);
                }        
                return;        
            }
        }

        if(this.mode==="species"){
            if(action === "nextPage"){
                const success = await this.RootStore.speciesListStore.nextPage(value);
                if(success){
                    this.setPage(value);                    
                    return;
                }
                return;
            }
    
            if(action==="prevPage"){
                const success = await this.RootStore.speciesListStore.prevPage(value);
                if(success){
                    this.setPage(value);
                }        
                return;        
            }
        }

        
            
            
    }   
};