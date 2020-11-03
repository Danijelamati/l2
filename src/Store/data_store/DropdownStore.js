import { makeObservable, observable, action } from 'mobx';

import firebase from '../../Common/util/firebase';

export default class SpeciesStore {
    
    @observable dropdown;

    constructor(){
        makeObservable(this);
        this.dropdown = [];
    }

    @action
    async setSpecies() {
            
        const db = firebase.firestore();

        const arr = await db
            .collection('species')
            .orderBy('name')
            .get();
       
        this.dropdown = arr.docs.map((d) => ({ ...d.data() }));        
    }

    @action
    clean(){
        this.dropdown = [];
    }

    findById(id){
        return {...this.dropdown.find((s) => s.id === id)};
    }
    
};