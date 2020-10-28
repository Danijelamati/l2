import React from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from '../../Store/RootStore';

import ListItem from '../../Components/ListItem';
import CaracterHeader from '../../Components/CaracterHeader';

 
const  CaracterEdit = observer(() => {
    
    const { editCaracterStore } = useRootStore();
    
    return (
      <div className="caracter-edit">                   
        <p>Preview:</p>
        <div className="edit-list-item">
          <CaracterHeader />                  
          <ListItem
            item={{
              id: editCaracterStore.editCaracter.id,
              makeId: editCaracterStore.editCaracter.makeId,
              name: editCaracterStore.editCaracter.name,
              abrv: editCaracterStore.editCaracter.abrv,
              makeName: editCaracterStore.editCaracter.makeName,
              makeAbrv: editCaracterStore.editCaracter.makeAbrv,
              }}
            key={editCaracterStore.editCaracter.id}
          />                    
        </div>                    
      </div>
    );
});

export default CaracterEdit;