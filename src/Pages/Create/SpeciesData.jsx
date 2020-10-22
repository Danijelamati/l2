import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { nanoid } from 'nanoid';

import firebase from '../../Common/util/firebase';
import { useRootStore } from '../../Store/RootStore';
import { Species } from '../../Common/models/models';

import SpeciesItem from '../../Components/SpeciesItem';
import SpeciesHeader from './SpeciesHeader';

const SpeciesData = observer( () => {

    const { addPageStore, newSpeciesStore } = useRootStore();

    const [redirect, setRedirect] = useState(false);

    const saveSpecies = async (addStore, newSpeStore, setRed) => {
       
        if(!newSpeStore.name || !newSpeStore.abrv){            
            addStore.setError("Input fields cannot be empty");
            return;
        }
        
        const db = firebase.firestore();

        let a = await db.collection("species").where("name", "==", newSpeStore.name).get();
        a = a.docs.map((d) => ({ ...d.data() }));
    
        if(a.length !== 0){
            addStore.setError("Species with that name exists") ;
            return;
        }              
        
        const newSpecies = new Species(nanoid(), newSpeStore.name, newSpeStore.abrv);        
        newSpecies.setFilter();
        
        await db.collection("species").doc().set({ ...newSpecies });
                
        setRed(true);
        
    };

    return (
        <div>
            <SpeciesHeader />
            <SpeciesItem species={{name: newSpeciesStore.name, abrv: newSpeciesStore.abrv}}/>
            <div>
                {
                    addPageStore.error && addPageStore.error
                }
            </div>            
            <button                
                type="button"
                name="save"
                onClick={() => saveSpecies(addPageStore, newSpeciesStore, setRedirect)}
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