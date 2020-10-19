import { makeAutoObservable } from 'mobx';

import firebase from '../../Common/util/firebase';

export default () => {
    return makeAutoObservable({
        species: [],
        async getSpecies() {
            
            const db = firebase.firestore();

            const arr = await db.collection('species')
                .orderBy('name')
                .get();

            this.species = arr.docs.map((d) => ({ ...d.data() }));
           
        },
        findSpecies(id){
            return this.species.find((s) => s.id === id);
        }
    });
};