import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';

import CaracterEdit from './CaracterEdit';
import SpeciesEdit from './SpeciesEdit';
import EditFields from './EditFields';

import './index.css';


function Edit({ location }) {
  const { caracter, species } = location;
 
  const { editPageStore } = useRootStore();

  const [redirect, setRedirect] = useState(false); 
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    
    (async () => {      
      if(!caracter && !species){
        setRedirect(true);
        return;
      }
      if(caracter){
        await editPageStore.initialise("caracter" ,caracter);  
      }else{
        await editPageStore.initialise("species" ,species); 
      }
         
      setLoaded(true);
      
    })();
  }, [editPageStore, caracter, species]);  

  return (
    <Observer>
      { () => (
                (!caracter && !species) || redirect ? <Redirect to="/list" />
                  : loaded
                && (
                  <div className="edit">
                    <EditFields />
                    {editPageStore.mode === "caracter" && <CaracterEdit caracter={caracter} setRedirect={setRedirect} />}
                    {editPageStore.mode === "species" && <SpeciesEdit species={species} setRedirect={setRedirect} />}                    
                  </div>
                )
      )}
    </Observer>  
  );
}

Edit.propTypes = {
  location: PropTypes.shape({
    caracter: PropTypes.shape(),
    species: PropTypes.shape()
  }),
};

Edit.defaultProps = {
  location: ''
};

export default Edit;
