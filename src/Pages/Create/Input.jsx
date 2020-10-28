import React from 'react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';

function Input(props) {

    const { species } = props;

    const { addPageStore, speciesStore } = useRootStore();

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
              <select onChange={(event) => addPageStore.selectCaracterSpecies(event.target.value)}>
                {speciesStore.species.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
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