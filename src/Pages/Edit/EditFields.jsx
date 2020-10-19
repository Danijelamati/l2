import React from 'react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';

import './EditFields.css';

function EditFields(props) {
  const { caracter } = props;

  const { editPageStore,speciesStore } = useRootStore();

  return (
    <div className="edit-fields">
      <div>
        <p className="edit-name">Edit name:</p>
        <input
          className="edit-input"
          type="text"
          onChange={(event) => editPageStore.editCaracter("name", event.target.value)}
          defaultValue={caracter.name}
          name="name"
        />
      </div>
      <div>
        <p>Edit abrv:</p>
        <input
          className="edit-input"
          type="text"
          onChange={(event) => editPageStore.editCaracter("abrv", event.target.value)}
          defaultValue={caracter.abrv}
          name="abrv"
        />
      </div>
      <div>
        <p>Select species</p>
        <select onChange={(event) => editPageStore.selectSpecies(event.target.value)}>
          {speciesStore.species.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
      </div>
    </div>
  );
}

EditFields.propTypes = {
  caracter: PropTypes.shape().isRequired,
};

export default EditFields;
