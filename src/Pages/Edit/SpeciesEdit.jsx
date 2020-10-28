import { observer } from 'mobx-react';
import React from 'react';

import { useRootStore } from '../../Store/RootStore';

import SpeciesItem from '../../Components/SpeciesItem';
import SpeciesHeader from '../../Components/SpeciesHeader';

const SpeciesEdit = observer(() =>{

    const { editSpeciesStore } = useRootStore();
    
    return (
      <div>
        <SpeciesHeader />
        <SpeciesItem 
          species={{name: editSpeciesStore.editedSpecies.name, 
          abrv: editSpeciesStore.editedSpecies.abrv}}
        />
        <p>Caracters with that specie</p>
        {
          editSpeciesStore.caracters.map(e => <p key={e.id}>{e.name}</p>)
        }                   
        </div>                 
        
    );
});

export default SpeciesEdit;