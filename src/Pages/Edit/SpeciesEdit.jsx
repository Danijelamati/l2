import { Observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';
import compareObjects from '../../Common/util/compareObjects';
import { FullCaracter, Species } from '../../Common/models/models';
import { saveSpecies, findSpeciesName } from '../../Common/util/saveSpecies';
import { saveWholeCaracter } from '../../Common/util/saveCaracter';

import SpeciesItem from '../../Components/SpeciesItem';
import SpeciesHeader from '../../Components/SpeciesHeader';

function SpeciesEdit(props) {

    const { species, setRedirect } = props;

    const { editSpeciesStore, listPageStore } = useRootStore();

    const handleSave = async (propSpecie, edSpecStore, lPageStore, setRed) => {

        if (compareObjects(propSpecie, edSpecStore.editedSpecies)) {      
            setRed(true);  
            return;
        }

        const check = await findSpeciesName(edSpecStore.editedSpecies.name);

        if(check){
          //name exists
          return;
        }

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

            saveWholeCaracter(fullCar);
            
            }
        }

        const newSpecie = new Species(
            edSpecStore.editedSpecies.id,
            edSpecStore.editedSpecies.name,
            edSpecStore.editedSpecies.abrv
        );
        newSpecie.setFilter(); 
          console.log(newSpecie.id)
        saveSpecies(newSpecie);       
        
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

SpeciesEdit.propTypes = {
    species: PropTypes.shape().isRequired,
    setRedirect: PropTypes.func.isRequired
  };

export default SpeciesEdit;