import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useLocalObservable, Observer } from 'mobx-react';
import PropTypes from 'prop-types';


import ListItem from '../../Components/ListItem';
import compareObjects from '../../Common/util/compareObjects';import { useAppStore } from '../../Store/appStore';

import EditFields from './EditFields';
import EditProps from './EditProps';

import './index.css';


function Edit ({location}) {

    const { editProps } = location; 
    
    const appStore = useAppStore(); 

    const [redirect, setRedirect] = useState(false);
    
    const editStore = useLocalObservable(() => ({
        editCaracter : {...editProps},
        setCaracterProperty(property, value){
          this.editCaracter[property] = value;
        }        
    }));

    const saveCaracter = ( propCaracter, eStore, aStore, setRed) => {
        
        if(compareObjects(propCaracter, eStore.editCaracter)){
            setRed(true);
            return;
        }
        aStore.editCaracter(eStore.editCaracter);
        setRed(true);
    };  

    return (
      <>
        {        
                !editProps || redirect ? <Redirect to="/list" />
                : (
                  <div className="edit">
                    <EditFields 
                      editProps={editProps}
                      editStore={editStore}
                    />
                    <p>Preview:</p>      
                    <div className="edit-list-item">
                      <EditProps /> 
                      <Observer>
                        {()=> (
                          <ListItem
                            item={{
                            id: editStore.editCaracter.id,
                            makeId: editStore.editCaracter.makeId, 
                            name: editStore.editCaracter.name,
                            abrv: editStore.editCaracter.abrv,
                            makeName: editStore.editCaracter.makeName,
                            makeAbrv: editStore.editCaracter.makeAbrv
                          }}                     
                            key={editStore.editCaracter.id}
                          />
                      )}                        
                      </Observer> 
                    </div>
                    <div>
                      <button 
                        onClick={() => saveCaracter(editProps, editStore, appStore, setRedirect)}                        
                        type="button"
                      >
                        Save
                      </button>                    
                      <button
                        onClick={() => setRedirect(true)}                         
                        type="button"
                      >
                        Cancel
                      </button>                 
                    </div>        
                  </div>
              )
}            
      </>
    );
};

Edit.propTypes = {  
  location: PropTypes.shape({
    editProps: PropTypes.shape().isRequired
  }).isRequired
};

export default Edit;