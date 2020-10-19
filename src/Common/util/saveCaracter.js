import firebase from './firebase';

import { Caracter, FullCaracter } from '../models/models';
import compareObjects from './compareObjects';

export default async (propCaracter, editCaracter) => {
    if (compareObjects(propCaracter, editCaracter)) {        
        return false;
      }
  
      const fullCar = new FullCaracter(
        editCaracter.id,
        editCaracter.makeId,
        editCaracter.makeName,
        editCaracter.makeAbrv,
        editCaracter.name,
        editCaracter.abrv,
      );
      fullCar.setFilter();
  
      const car = new Caracter(
        editCaracter.id,
        editCaracter.makeId,
        editCaracter.name,
        editCaracter.abrv,
      );

      const db = firebase.firestore();
  
      await db.collection('caracters').doc(car.id).set({ ...car });
  
      await db.collection('list').doc(fullCar.id).set({ ...fullCar });
      
      return true;
};