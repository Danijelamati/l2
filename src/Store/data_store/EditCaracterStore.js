import { makeAutoObservable } from 'mobx';

export default () => {
    return makeAutoObservable({
        editCaracter: {},
        setWholeCaracter(obj){
            this.editCaracter = {...obj}
        },
        setCaracterProperty(property, value) {
            this.editCaracter[property] = value;
        },
        setCaracterSpecies(species){  

            if(species.id === this.editCaracter.makeId){
                return;
            }
            
            this.setCaracterProperty('makeId', species.id);
            this.setCaracterProperty('makeName', species.name);
            this.setCaracterProperty('makeAbrv', species.abrv);
            
        }    
    });
};