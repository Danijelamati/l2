import { makeObservable, observable, action } from 'mobx';

import firebase from '../../Common/util/firebase';

export default class SpeciesStore {
    
    @observable species

    constructor(){
        makeObservable(this);
        this.species = [];
    }

    @action
    async setSpecies() {
            
        const db = firebase.firestore();

        const arr = await db
            .collection('species')
            .orderBy('name')
            .get();
       
        this.species = arr.docs.map((d) => ({ ...d.data() }));        
    }

    @action
    clean(){
        this.species = [];
    }

    findSpecies(id){
        return {...this.species.find((s) => s.id === id)};
    }
    
};