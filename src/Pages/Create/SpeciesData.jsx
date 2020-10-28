import { observer } from 'mobx-react';
import React from 'react';

import { useRootStore } from '../../Store/RootStore';

import SpeciesItem from '../../Components/SpeciesItem';
import SpeciesHeader from '../../Components/SpeciesHeader';


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