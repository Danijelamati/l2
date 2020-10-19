import { makeAutoObservable } from 'mobx';

export default (RootStore) => {
    return makeAutoObservable({        
        loaded: false,
        redirect: false,
        setLoaded(value){
            this.loaded = value;
        },
        async loading(caracter){
            RootStore.editCaracterStore.setWholeCaracter(caracter);
            
            if(RootStore.speciesStore.species.length < 1){
                await RootStore.speciesStore.getSpecies();
            }

            this.setLoaded(true);
        },
        setRedirect(value){
            this.redirect = value;
        },
        editCaracter(name, value){            
            RootStore.editCaracterStore.setCaracterProperty(name,value);
        },
        selectSpecies(makeId){
            
            if(makeId === RootStore.editCaracterStore.editCaracter.makeId){
                return;
            }
            const species = RootStore.speciesStore.findSpecies(makeId);  
            
            if(!species){
                return;
            }

            RootStore.editCaracterStore.setCaracterSpecies(species);
        },
        exit(){
            this.setRedirect(false);
            this.setLoaded(false);            
        }
    })
};
