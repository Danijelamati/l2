import { action, makeObservable, observable } from 'mobx';

export default class EditCaracterStore{
    
    @observable editCaracter;
    
    constructor(){
        makeObservable(this);
    }
    
    @action
    initialise(obj){
        this.editCaracter = {...obj};
    }

    @action
    setCaracterProperty(property, value) {
        this.editCaracter[property] = value;
    }

    @action
    setCaracterSpecies(species){  

        if(species.id === this.editCaracter.makeId){
            return;
        }
            
        this.setCaracterProperty('makeId', species.id);
        this.setCaracterProperty('makeName', species.name);
        this.setCaracterProperty('makeAbrv', species.abrv);
            
    }    
    
};