import React from 'react';
import PropTypes from 'prop-types';

import './EditFields.css';

function EditFields(props) {
  const { editStore, editProps } = props;

  const handleChange = (event, eStore) => {
    eStore.setCaracterProperty(event.target.name, event.target.value);
  };

  const handleSelect = (event, eStore) => {
    const getSpecies = eStore.species.find((s) => s.id === event.target.value);

    eStore.setCaracterProperty('makeId', getSpecies.id);
    eStore.setCaracterProperty('makeName', getSpecies.name);
    eStore.setCaracterProperty('makeAbrv', getSpecies.abrv);
  };

  return (
    <div className="edit-fields">
      <div>
        <p className="edit-name">Edit name:</p>
        <input
          className="edit-input"
          type="text"
          onChange={(event) => handleChange(event, editStore)}
          defaultValue={editProps.name}
          name="name"
        />
      </div>
      <div>
        <p>Edit abrv:</p>
        <input
          className="edit-input"
          type="text"
          onChange={(event) => handleChange(event, editStore)}
          defaultValue={editProps.abrv}
          name="abrv"
        />
      </div>
      <div>
        <p>Select species</p>
        <select onChange={(event) => handleSelect(event, editStore)}>
          {editStore.species.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
      </div>
    </div>
  );
}

EditFields.propTypes = {
  editStore: PropTypes.shape().isRequired,
  editProps: PropTypes.shape().isRequired,
};

export default EditFields;
