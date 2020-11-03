import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { useRootStore } from '../../Store/RootStore';

import { Input, SpeciesData, CaracterData, Data} from './index';

import './index.css';


const Create = observer(({location}) => {

    const { entity } = location;
    
    const { addPageStore } = useRootStore();

    useEffect(() => {
     
        if(!entity || (entity !== "caracter" && entity !== "species")){
          addPageStore.setRedirect(true);
          return;
        }
        
        (async () => {         
          await addPageStore.initialise(entity);
        })();
        
    },[entity,addPageStore]);

    useEffect(()=>{
      return () => {
        if(addPageStore.redirect){            
          addPageStore.exit();
        }          
      }
    },[addPageStore]);

    return (
      <>        
        {addPageStore.redirect && <Redirect to="/list" />}                
        <div>
          {!addPageStore.loaded ? 
            <p>loading...</p>
          : (
            <>
              <h1>
                new
                {addPageStore.mode}
              </h1>
              <Input species={addPageStore.mode === "caracter"} />
              <Data 
                save={(createPgStore) => createPgStore.mode === "species" ? createPgStore.handleSaveSpecies() : createPgStore.handleSaveCaracter()}
                table={(createPgStore) => createPgStore.mode === "species" ? <SpeciesData /> : <CaracterData />}
                />
            </>
          )}   
        </div>                      
      </>
    );
});

Create.propTypes = {
    location: PropTypes.shape({
      entity: PropTypes.string.isRequired
    }),    
  }; 

Create.defaultProps = {
  entity : ""
}; 

export default Create;