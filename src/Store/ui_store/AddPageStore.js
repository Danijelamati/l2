import { makeObservable, observable, action } from "mobx";
import { nanoid } from 'nanoid';

import { saveWholeCaracter, findCaracterName} from '../../Common/util/saveCaracter';
import { FullCaracter, Species } from '../../Common/models/models';
import { findSpeciesName, saveSpecies } from '../../Common/util/saveSpecies';

export default class AddPageStore {    

    @observable mode;

    @observable error;

    @observable redirect;

    @observable loaded;

    constructor(RootStore){
        makeObservable(this);
        this.RootStore = RootStore;
        this.redirect = false;
        this.error = "";
        this.loaded = false;
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
        this.setLoaded(true);
    }

    @action
    setLoaded(value){
        this.loaded = value;
    }

    @action
    setError(value){
        this.error = value;
    }

    @action
    setRedirect(value){
        this.redirect = value;
    }

    @action
    exit(){
        this.error = "";
        this.loaded = false;
        this.redirect = false;
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

    async handleSaveCaracter(){

        const { newCaracterStore, listPageStore } = this.RootStore;

        if(!newCaracterStore.name || !newCaracterStore.abrv || newCaracterStore.selectedSpecies.length === 0){
            this.setError("Fileds cannot be empty");
            return;
        }

        const check = await findCaracterName(newCaracterStore.name);
        
        if(check){
            this.setError("Caracter with that name exists");
            return;
        }         
        
        const fullCaracter = new FullCaracter(
            nanoid(),
            newCaracterStore.selectedSpecies.id,
            newCaracterStore.selectedSpecies.name,
            newCaracterStore.selectedSpecies.abrv,
            newCaracterStore.name,
            newCaracterStore.abrv);

        fullCaracter.setFilter();

        await saveWholeCaracter(fullCaracter);
        listPageStore.resetOptions();
        this.setRedirect(true);
    };

    async handleSaveSpecies () {
        
        const { newSpeciesStore, listPageStore } = this.RootStore;
       
        if(!newSpeciesStore.name || !newSpeciesStore.abrv){            
            this.setError("Input fields cannot be empty");
            return;
        }
        
        const found = await findSpeciesName(newSpeciesStore.name);
    
        if(found){
            this.setError("Species with that name exists");
            return;
        }              
        
        const newSpecies = new Species(nanoid(), newSpeciesStore.name, newSpeciesStore.abrv);        
        newSpecies.setFilter();
        
        saveSpecies(newSpecies); 

        listPageStore.resetOptions();
                
        this.setRedirect(true);
        
    };

};