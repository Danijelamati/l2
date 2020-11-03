import { action, makeObservable, observable } from 'mobx';

import compareObjects from '../../Common/util/compareObjects';
import { saveWholeCaracter, findCaracterName } from '../../Common/util/saveCaracter';
import { FullCaracter, Species } from '../../Common/models/models';
import { saveSpecies, findSpeciesName } from '../../Common/util/saveSpecies';

export default class EditPageStore {
           
    @observable mode;

    @observable redirect;

    @observable loaded;

    constructor(RootStore){
        makeObservable(this);
        this.RootStore = RootStore;   
        this.redirect = false;   
        this.loaded = false;  
    }

    @action
    setMode(value){
        this.mode = value;
    }

    @action
    setRedirect(value){
        this.redirect = value;              
    }

    @action
    setLoaded(value){
        this.loaded = value;
    }

    @action
    exit(){
        this.loaded = false;
        this.redirect = false;
        if(this.mode === "caracter"){
            this.RootStore.speciesStore.clean();
        }
    }
    
    async initialise(value, entity){
        
        if(value === "species"){
            await this.RootStore.editSpeciesStore.initialise(entity);
        }
        
        if(value==="caracter"){
            this.RootStore.editCaracterStore.initialise(entity);
            await this.RootStore.speciesStore.setSpecies();
        }

        this.setMode(value);  
        this.setLoaded(value);
    }

    input(name, value){   
        if(this.mode === "species"){
            this.RootStore.editSpeciesStore.setProperty(name,value);
            return;
        }   
        if(this.mode === "caracter"){
            this.RootStore.editCaracterStore.setCaracterProperty(name,value);
        }              
    }

    selectSpecies(makeId){
            
        if(!makeId){
            return;
        }

        if(makeId === this.RootStore.editCaracterStore.editCaracter.makeId){
            return;
        }

        const species = this.RootStore.speciesStore.findById(makeId);              
        if(!species){
            return;
        }

        this.RootStore.editCaracterStore.setCaracterSpecies(species);
    }

    async handleSaveCaracter (propCaracter) {

        const { editCaracterStore, listPageStore } = this.RootStore;

        if (compareObjects(propCaracter, editCaracterStore.editCaracter)) {      
            this.setRedirect(true);  
            return;
        }

        const check = await findCaracterName(editCaracterStore.editCaracter.name);

        if(check && propCaracter.name !== editCaracterStore.editCaracter.name){
          //name exists
          return;
        }

        const fullCar = new FullCaracter(
            editCaracterStore.editCaracter.id,
            editCaracterStore.editCaracter.makeId,
            editCaracterStore.editCaracter.makeName,
            editCaracterStore.editCaracter.makeAbrv,
            editCaracterStore.editCaracter.name,
            editCaracterStore.editCaracter.abrv
        );
        fullCar.setFilter();

        const changed = await saveWholeCaracter(fullCar);
       
        if(changed){
          listPageStore.resetOptions();
        }
        
        this.setRedirect(true);
        
      };

      async handleSaveSpecies(propSpecie){

        const { editSpeciesStore, listPageStore } = this.RootStore;

        if (compareObjects(propSpecie, editSpeciesStore.editedSpecies)) {      
            this.setRedirect(true);  
            return;
        }

        const check = await findSpeciesName(editSpeciesStore.editedSpecies.name);

        if(check){
          //name exists
          return;
        }

        if(editSpeciesStore.caracters.length > 0){
            for(let i = 0; i < editSpeciesStore.caracters.length; i++){
                
              const fullCar = new FullCaracter(
                editSpeciesStore.caracters[i].id,
                editSpeciesStore.editedSpecies.id,
                editSpeciesStore.editedSpecies.name,
                editSpeciesStore.editedSpecies.abrv,
                editSpeciesStore.caracters[i].name,
                editSpeciesStore.caracters[i].abrv
            );
            fullCar.setFilter();

            saveWholeCaracter(fullCar);
            
            }
        }

        const newSpecie = new Species(
            editSpeciesStore.editedSpecies.id,
            editSpeciesStore.editedSpecies.name,
            editSpeciesStore.editedSpecies.abrv
        );
        newSpecie.setFilter(); 

        saveSpecies(newSpecie);       
        
        listPageStore.resetOptions();        
        
        this.setRedirect(true); 
        
      };

    
};
