import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { useRootStore } from '../../Store/RootStore';
import { saveWholeCaracter, findCaracterName} from '../../Common/util/saveCaracter';
import { FullCaracter } from '../../Common/models/models';

import ListItem from '../../Components/ListItem';
import CaracterHeader from './CaracterHeader';

const CaracterData = observer( () => {

    const { addPageStore, speciesStore, newCaracterStore, listPageStore } = useRootStore();

    const [redirect, setRedirect] = useState(false);

    const handleSave = async (newCarStore, addPgStore, setRed, listPgStore) => {

        if(!newCarStore.name || !newCarStore.abrv || newCarStore.selectedSpecies.length === 0){
            addPgStore.setError("Fileds cannot be empty");
            return;
        }

        const check = await findCaracterName(newCarStore.name);
        
        if(check){
            addPgStore.setError("Caracter with that name exists");
            return;
        }         
        
        const fullCaracter = new FullCaracter(
            nanoid(),
            newCarStore.selectedSpecies.id,
            newCarStore.selectedSpecies.name,
            newCarStore.selectedSpecies.abrv,
            newCarStore.name,
            newCarStore.abrv);

        fullCaracter.setFilter();

        await saveWholeCaracter(fullCaracter);
        listPgStore.resetOptions();
        setRed(true);
    };

    return (
      <div>                          
        <div>
          <p>Select species</p>
          <select onChange={(event) => addPageStore.selectCaracterSpecies(event.target.value)}>
            {speciesStore.species.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </div>
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
        <div>
          {
                addPageStore.error && addPageStore.error
              }
        </div>
        <button
          onClick={() => handleSave(newCaracterStore, addPageStore, setRedirect, listPageStore)}
          type="button"
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

export default CaracterData;