import { observer } from 'mobx-react';
import React from 'react';

import { useRootStore } from '../../Store/RootStore';

import { SpeciesItem, SpeciesHeader } from '../../Components';


const SpeciesData = observer( () => {

    const { newSpeciesStore} = useRootStore();

    return (
      <div className="caracter-table">
        <SpeciesHeader />
        <SpeciesItem species={{name: newSpeciesStore.name, abrv: newSpeciesStore.abrv}} />        
      </div>
    );
});

export default SpeciesData;