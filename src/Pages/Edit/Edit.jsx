import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';

import { CaracterEdit, SpeciesEdit, Input, EditEntity } from './index';

import './index.css';


const Edit = observer(({ location }) => {

  const { caracter, species} = location;
  
  const { editPageStore } = useRootStore();

  useEffect(() => {    
    (async () => {      
      if(!caracter && !species){ 
        editPageStore.setRedirect(true);
        return;
      }
      
      if(caracter){
        await editPageStore.initialise("caracter" ,caracter);  
      }else{
        await editPageStore.initialise("species" ,species); 
      }
      
    })();
  }, [editPageStore, caracter, species]); 
  
  useEffect(() => {
    return () => {
      if(editPageStore.redirect){
        editPageStore.exit();
      }      
    };
  }, [editPageStore]);

  return (    
    <>
    {
      editPageStore.redirect && <Redirect to="/list" />
    }
    {
      editPageStore.loaded && (
        <div className="edit">
          <Input species={editPageStore.mode === "caracter"} />
          <EditEntity 
            render={ (editStore) => editStore.mode ==="species" ? <SpeciesEdit /> : <CaracterEdit />}
            save={( editStore, ent) => editStore.mode === "species" ? editStore.handleSaveSpecies(ent) : editStore.handleSaveCaracter(ent) }
            entity={!caracter ? species : caracter}
          />            
        </div> 
      )      
    }
    </>
       
  );
});

Edit.propTypes = {
  location: PropTypes.shape({
    caracter: PropTypes.shape(),
    species: PropTypes.shape()
  }),
};

export default Edit;
