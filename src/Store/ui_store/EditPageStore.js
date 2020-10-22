import { action, makeObservable, observable } from 'mobx';

export default class EditPageStore {
           
    @observable mode;

    constructor(RootStore){
        makeObservable(this);
        this.RootStore = RootStore;        
    }

    @action
    setMode(value){
        this.mode = value;
    }
    
    async initialise(value, entity){
        console.log("initialise",value, entity)
        if(value === "species"){
            await this.RootStore.editSpeciesStore.initialise(entity);
        }
        
        if(value==="caracter"){
            this.RootStore.editCaracterStore.initialise(entity);
            await this.RootStore.speciesStore.setSpecies();
        }

        this.setMode(value);        
    }

    async loading(caracter){
        this.RootStore.editCaracterStore.setWholeCaracter(caracter);
            
        if(this.RootStore.speciesStore.species.length < 1){
            await this.RootStore.speciesStore.setSpecies();
        }
    }

    input(name, value){   
        if(this.mode === "species"){
            this.RootStore.editSpeciesStore.setProperty(name,value);
        }   
        if(this.mode === "caracter"){
            this.RootStore.editCaracterStore.setCaracterProperty(name,value);
        }              
    }

    selectSpecies(makeId){
            
        if(makeId === this.RootStore.editCaracterStore.editCaracter.makeId){
            return;
        }
        const species = this.RootStore.speciesStore.findSpecies(makeId);  
            
        if(!species){
            return;
        }

        this.RootStore.editCaracterStore.setCaracterSpecies(species);
    }
    
};
