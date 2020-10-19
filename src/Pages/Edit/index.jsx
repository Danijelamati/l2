import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Observer } from 'mobx-react';
import PropTypes from 'prop-types';

import ListItem from '../../Components/ListItem';
import { useRootStore } from '../../Store/RootStore';
import saveCaracter from '../../Common/util/saveCaracter';

import EditFields from './EditFields';
import EditProps from './EditProps';

import './index.css';

function Edit({ location }) {
  const { caracter } = location;
 
  const { listPageStore, editPageStore, editCaracterStore } = useRootStore();

  const [redirect, setRedirect] = useState(false); 

  useEffect(() => {
    
    (async () => {      
      if(!caracter){
        setRedirect(true);
        return;
      }
      await editPageStore.loading(caracter);     
      
    })();
  }, [editPageStore, caracter]);

  const handleSave = async (propCaracter, edCarStore, lPageStore, setRed) => {
    console.log("hit")
    const changed = await saveCaracter(propCaracter, edCarStore.editCaracter);
    console.log(changed)
    if(changed){
      lPageStore.resetOptions();
    }
    
    setRed(true);
  };

  return (
    <Observer>
      { () => (
                !caracter || redirect ? <Redirect to="/list" />
                  : editPageStore.loaded
                && (
                  <div className="edit">
                    <EditFields
                      caracter={caracter}
                    />
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
      )}
    </Observer>  
  );
}

Edit.propTypes = {
  location: PropTypes.shape({
    caracter: PropTypes.shape(),
  }),
};

Edit.defaultProps = {
  location: ''
};

export default Edit;
