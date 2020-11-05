import firebase from './firebase';

import { Caracter } from '../models/models';

const checkEntityName = async (collectionName, entityName) => {
    const db = firebase.firestore();
   
    let find = await db.collection(collectionName).where("name", "==", entityName).get();
    find = find.docs.map((d) => ({ ...d.data() }));
    
    return find.length !== 0; 
};

const getWholeCollection = async (collectionName, order = "name") => {

    const db = firebase.firestore();

    const collection = await db
        .collection(collectionName)
        .orderBy(order)
        .get(); 

    return collection.docs.map((d) => ({ ...d.data() }));
    
};

const saveDocument = (collectionName, doc) => {
    const db = firebase.firestore();
    db.collection(collectionName).doc(doc.id).set({...doc});
};

const saveWholeCaracter = async (fullCaracter) => {
  
    const caracter = new Caracter(
      fullCaracter.id,
      fullCaracter.makeId,
      fullCaracter.name,
      fullCaracter.abrv,
    );

    const db = firebase.firestore();

    await db.collection('caracters').doc(caracter.id).set({ ...caracter });

    await db.collection('list').doc(fullCaracter.id).set({ ...fullCaracter });
   
    return true;
};


export {
    checkEntityName,
    getWholeCollection,
    saveDocument,
    saveWholeCaracter
};

