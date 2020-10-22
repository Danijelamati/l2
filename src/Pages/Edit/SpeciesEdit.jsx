import { Observer } from 'mobx-react';
import React from 'react';

import { useRootStore } from '../../Store/RootStore';
import compareObjects from '../../Common/util/compareObjects';
import firebase from '../../Common/util/firebase'; 
import { FullCaracter, Species } from '../../Common/models/models';

import SpeciesItem from '../../Components/SpeciesItem';
import SpeciesHeader from '../Create/SpeciesHeader';

function SpeciesEdit(props) {

    const { species, setRedirect } = props;

    const { editSpeciesStore, listPageStore } = useRootStore();

    const handleSave = async (propSpecie, edSpecStore, lPageStore, setRed) => {

        if (compareObjects(propSpecie, edSpecStore.editedSpecies)) {      
            setRed(true);  
            return;
        }

        const db = firebase.firestore();

        if(edSpecStore.caracters.length > 0){
            for(let i = 0; i < edSpecStore.caracters.length; i++){
                
                const fullCar = new FullCaracter(
                    edSpecStore.caracters[i].id,
                    edSpecStore.editedSpecies.id,
                    edSpecStore.editedSpecies.name,
                    edSpecStore.editedSpecies.abrv,
                    edSpecStore.caracters[i].name,
                    edSpecStore.caracters[i].abrv
                );
                fullCar.setFilter();

                db.collection("list").doc(fullCar.id).set({...fullCar})
            }
        }

        const newSpecie = new Species(
            edSpecStore.editedSpecies.id,
            edSpecStore.editedSpecies.name,
            edSpecStore.editedSpecies.abrv
        );
        newSpecie.setFilter(); 
        db.collection("species").doc(newSpecie.id).set({...newSpecie});
       
        
        lPageStore.resetOptions();        
        
        setRed(true);
        
      };

    
    return (
        <Observer>
            {
                () => (
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
                        {

                        }
                        <button
                            onClick={() => handleSave(species, editSpeciesStore, listPageStore, setRedirect)}
                            type="button"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => {
                            setRedirect(true);
                            }}
                            type="button"
                        >
                            Cancel
                        </button>                        
                    </div>
                )
            }
        </Observer>
    );
}

export default SpeciesEdit;