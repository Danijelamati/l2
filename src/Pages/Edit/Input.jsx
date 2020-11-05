import React from 'react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';

import { Dropdown } from '../../Components';

function Input(props) {

  const { species } = props;
  
  const { editPageStore, dropdownStore } = useRootStore();

  return (
    <div className="edit-fields">
      <div>
        <p className="edit-name">Edit name:</p>
        <input
          className="edit-input"
          type="text"
          onChange={(event) => editPageStore.input("name", event.target.value)}
          defaultValue=""
          name="name"
        />
      </div>
      <div>
        <p>Edit abrv:</p>
        <input
          className="edit-input"
          type="text"
          onChange={(event) => editPageStore.input("abrv", event.target.value)}
          defaultValue=""
          name="abrv"
        />
      </div>
      {
        species && (
          <div>
            <p>Select species</p>
            <Dropdown 
              onChange={e => editPageStore.selectSpecies(e.target.value)} 
              options={() => dropdownStore.dropdown.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
              />
          </div>
        )
      }      
    </div>
  );
}

Input.propTypes = {
  species: PropTypes.bool
};

export default Input;
