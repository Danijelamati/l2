import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { useRootStore } from '../../Store/RootStore';
import saveCaracter from '../../Common/util/saveCaracter';
import firebase from '../../Common/util/firebase';
import { FullCaracter } from '../../Common/models/models';

import ListItem from '../../Components/ListItem';
import CaracterHeader from './CaracterHeader';

const CaracterData = observer( () => {

    const { addPageStore, speciesStore, newCaracterStore } = useRootStore();

    const [redirect, setRedirect] = useState(false);

    const handleSave = async (newCarStore, addPgStore, setRed) => {

        if(!newCarStore.name || !newCarStore.abrv || newCarStore.selectedSpecies.length === 0){
            addPgStore.setError("Fileds cannot be empty");
            return;
        }

        const db = firebase.firestore();

        let findCaracter = await db.collection("caracters").where("name", "==", newCarStore.name).get();
        findCaracter = findCaracter.docs.map((d) => ({ ...d.data() }));
        
        if(findCaracter.length !== 0){
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

        await saveCaracter(fullCaracter);
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
                onClick={() => handleSave(newCaracterStore, addPageStore, setRedirect)}
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