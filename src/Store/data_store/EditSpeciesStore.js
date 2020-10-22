import { action, makeObservable, observable } from 'mobx';

import firebase from '../../Common/util/firebase';

export default class EditSpeciesStore{
    
    @observable editedSpecies;

    @observable caracters;
    
    constructor(){
        makeObservable(this);
    }

    @action
    async initialise(species){

        let db = firebase.firestore();

        db = await db.collection("caracters")                    
                    .where("makeId", "==", species.id)
                    .get();
      
        this.editedSpecies = species; 
        this.caracters = db.docs.map((d) => ({ ...d.data() }));

    }

    @action
    setProperty(name, value){
        this.editedSpecies[name] = value;
    }
        
    

    
    
};