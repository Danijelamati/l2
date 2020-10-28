import React from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from '../../Store/RootStore';

import ListItem from '../../Components/ListItem';
import CaracterHeader from '../../Components/CaracterHeader';

const CaracterData = observer( () => {

    const { newCaracterStore } = useRootStore();

    return (      
      <div className="caracter-table">
        <CaracterHeader />
        <ListItem 
          item={{
                      name: newCaracterStore.name,
                      abrv: newCaracterStore.abrv,
                      makeName: newCaracterStore.selectedSpecies.name,
                      makeAbrv: newCaracterStore.selectedSpecies.abrv,
                 }}
          />              
      </div>
    );
});

export default CaracterData;