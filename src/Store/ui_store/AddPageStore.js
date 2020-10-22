import { makeObservable, observable, action } from "mobx";

export default class AddPageStore {    

    @observable mode

    @observable error

    constructor(RootStore){
        makeObservable(this);
        this.RootStore = RootStore;
    }

    @action
    async initialise(entity){
        this.mode = entity;
        this.error = "";
        
        if(entity === "species"){
            this.RootStore.newSpeciesStore.initialise();
        }else{
            await this.RootStore.speciesStore.setSpecies();
            this.RootStore.newCaracterStore.initialise();
        }
    }

    @action
    setError(value){
        this.error = value;
    }
    
    setInput(name, value){        
        if(this.mode === "species"){            
            this.RootStore.newSpeciesStore.setValue(name,value);
        }else{
            this.RootStore.newCaracterStore.setValue(name,value);
        }
    }

    selectCaracterSpecies(id){
        this.RootStore.newCaracterStore.setSpecies(this.RootStore.speciesStore.findSpecies(id));
    }

};