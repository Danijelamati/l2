import { action, makeObservable, observable } from 'mobx';

import firebase from '../../Common/util/firebase';

export default class EditSpeciesStore{
    
    @observable editedSpecies;

    @observable caracters;
    
    constructor(){
        makeObservable(this);
    }

    @action
    setValue(name,value){
        this[name] = value;
    }

    @action
    setProperty(name, value){
        this.editedSpecies[name] = value;
    }
        
    async initialise(species){

        let db = firebase.firestore();

        db = await db.collection("caracters")                    
                    .where("makeId", "==", species.id)
                    .get();
      
        this.setValue("editedSpecies", species);
        this.setValue("caracters", db.docs.map((d) => ({ ...d.data() })));       

    }
    
};