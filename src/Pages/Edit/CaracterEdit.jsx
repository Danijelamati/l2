import React from 'react';
import { Observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';
import compareObjects from '../../Common/util/compareObjects';
import { saveWholeCaracter, findCaracterName } from '../../Common/util/saveCaracter';

import ListItem from '../../Components/ListItem';
import EditProps from './EditProps';
import { FullCaracter } from '../../Common/models/models';

 
function CaracterEdit(props) {

    const { setRedirect, caracter } = props;
    
    const { editCaracterStore, listPageStore } = useRootStore();

    const handleSave = async (propCaracter, edCarStore, lPageStore, setRed) => {

        if (compareObjects(propCaracter, edCarStore.editCaracter)) {      
            setRed(true);  
            return;
        }

        const check = await findCaracterName(edCarStore.editCaracter.name);

        if(check){
          //name exists
          return;
        }

        const fullCar = new FullCaracter(
            edCarStore.editCaracter.id,
            edCarStore.editCaracter.makeId,
            edCarStore.editCaracter.makeName,
            edCarStore.editCaracter.makeAbrv,
            edCarStore.editCaracter.name,
            edCarStore.editCaracter.abrv
        );
        fullCar.setFilter();

        const changed = await saveWholeCaracter(fullCar);
       
        if(changed){
          lPageStore.resetOptions();
        }
        
        setRed(true);
        
      };

    return (
      <Observer>
        {
                ()=> (
                  <div className="caracter-edit">                   
                    <p>Preview:</p>
                    <div className="edit-list-item">
                      <EditProps />                      
                      <ListItem
                        item={{
                              id: editCaracterStore.editCaracter.id,
                              makeId: editCaracterStore.editCaracter.makeId,
                              name: editCaracterStore.editCaracter.name,
                              abrv: editCaracterStore.editCaracter.abrv,
                              makeName: editCaracterStore.editCaracter.makeName,
                              makeAbrv: editCaracterStore.editCaracter.makeAbrv,
                            }}
                        key={editCaracterStore.editCaracter.id}
                      />                    
                    </div>
                    <div>
                      <button
                        onClick={() => handleSave(caracter, editCaracterStore, listPageStore, setRedirect)}
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
                  </div>
                )
            }
      </Observer>
        
    );
}

CaracterEdit.propTypes = {
  caracter: PropTypes.shape().isRequired,
  setRedirect: PropTypes.func.isRequired
};

export default CaracterEdit;