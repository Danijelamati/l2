import firebase from './firebase';

import { Caracter } from '../models/models';

export default async (fullCaracter) => {
  
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