import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { useRootStore } from '../../Store/RootStore';
import { Species } from '../../Common/models/models';
import { findSpeciesName, saveSpecies } from '../../Common/util/saveSpecies';

import SpeciesItem from '../../Components/SpeciesItem';
import SpeciesHeader from '../../Components/SpeciesHeader';


const SpeciesData = observer( () => {

    const { addPageStore, newSpeciesStore, listPageStore } = useRootStore();

    const [redirect, setRedirect] = useState(false);

    const handleSave = async (addStore, newSpeStore, setRed, listPgStore) => {
       
        if(!newSpeStore.name || !newSpeStore.abrv){            
            addStore.setError("Input fields cannot be empty");
            return;
        }
        
        const found = await findSpeciesName(newSpeStore.name);
    
        if(found){
            addStore.setError("Species with that name exists") ;
            return;
        }              
        
        const newSpecies = new Species(nanoid(), newSpeStore.name, newSpeStore.abrv);        
        newSpecies.setFilter();
        
        saveSpecies(newSpecies); 

        listPgStore.resetOptions();
                
        setRed(true);
        
    };

    return (
      <div>
        <SpeciesHeader />
        <SpeciesItem species={{name: newSpeciesStore.name, abrv: newSpeciesStore.abrv}} />
        <div>
          {
            addPageStore.error && addPageStore.error
          }
        </div>            
        <button                
          type="button"
          name="save"
          onClick={() => handleSave(addPageStore, newSpeciesStore, setRedirect, listPageStore)}
        >
          Save
        </button>
        <button                
          type="button"
          name="cancel"
          onClick={() => setRedirect(true)}
        >
          Cancel
        </button>
        {
                redirect && <Redirect to="/list" />
        }
      </div>
    );
});

export default SpeciesData;