import firebase from './firebase';

const findSpeciesName = async (name) => {
    const db = firebase.firestore();
   
    let find = await db.collection("species").where("name", "==", name).get();
    find = find.docs.map((d) => ({ ...d.data() }));
    
    return find.length !== 0; 
};

const saveSpecies = (species) => {
    const db = firebase.firestore();
    db.collection("species").doc(species.id).set({...species});
};


export {
    findSpeciesName,
    saveSpecies
};