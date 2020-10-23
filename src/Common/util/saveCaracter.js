import firebase from './firebase';

import { Caracter } from '../models/models';

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

const findCaracterName = async (name) => {
  const db = firebase.firestore();

  let findCaracter = await db.collection("caracters").where("name", "==", name).get();
  findCaracter = findCaracter.docs.map((d) => ({ ...d.data() }));

  return findCaracter.length !== 0;
};

const saveListCaracter = (caracter) => {
  const db = firebase.firestore();

  db.collection("list").doc(caracter.id).set({...caracter})
}

export {
  saveWholeCaracter,
  findCaracterName,
  saveListCaracter
};