import React from 'react';

import { useAppStore } from '../../App';
import quickSort from '../../Common/util/quickSort';

import './EditFields.css';

function EditFields(props) {

    const { editStore } = props;
    const { name, abrv } = props.fullCaracter;

    const appStore = useAppStore();

    const handleChange = ( value, property, store ) => {
        store.setCaracterProperty(value,property);
    };

    const handleSelect = (event, editStore, appStore) => {
        const getSpecies = appStore.species.find(e => e.id === event.target.value);
        
        editStore.setCaracterSpecies(getSpecies.id, getSpecies.name, getSpecies.abrv);
    };

    return (
        <div className={"edit-fields"}>
            <div>
                <p className={"edit-name"}>Edit name:</p>
                <input 
                    className={"edit-input"} 
                    type={"text"} 
                    onChange={event => handleChange(event.target.value, event.target.name, editStore)} 
                    defaultValue={name}
                    name={"name"}
                />
            </div>
            <div>
                <p>Edit abrv:</p>
                <input 
                    className={"edit-input"} 
                    type={"text"} 
                    onChange={event => handleChange(event.target.value, event.target.name, editStore)} 
                    defaultValue={abrv}
                    name={"abrv"}
                />
            </div>
            <div>
                <p>Select species</p>
                <select onChange={ (event) => handleSelect(event,editStore, appStore)}>
                    {quickSort(appStore.species, "name").map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
            </div>
        </div>
    );
}

export default EditFields;