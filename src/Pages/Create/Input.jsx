import React from 'react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';

import { SpeciesDropdown } from '../../Components';


function Input(props) {

    const { species } = props;

    const { addPageStore } = useRootStore();

    return (
      <div className="input">            
        <div>
          <p className="new-name">New name:</p>
          <input
            className="new-input"
            type="text"
            onSelect={(event) => addPageStore.setInput(event.target.name, event.target.value)}
            name="name"
          />
        </div>
        <div>
          <p>New abrv:</p>
          <input
            className="new-input"
            type="text"
            onSelect={(event) => addPageStore.setInput(event.target.name, event.target.value)}
            name="abrv"
          />
        </div>
        {
          species && (
            <div>
              <p>Select species</p>              
              <SpeciesDropdown onChange={e => addPageStore.selectCaracterSpecies(e.target.value)} />
            </div>
          )
        }        
      </div>
    );
};

Input.propTypes = {
  species: PropTypes.bool
};

export default Input;