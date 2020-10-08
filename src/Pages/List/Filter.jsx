import React from 'react';
import { useAppStore } from '../../App';

import './Filter.css';

const Filter = () => {

    const appStore = useAppStore();

    const handleFilter = (event) => {
        event.preventDefault();
        appStore.filterList(event.target.value);
    };

    return (
        <div className={"filter"}>
            <p className={"filter-para"}>Filter:</p>
            <input 
                className={"filter-input"} 
                type={"text"} 
                onChange={event => handleFilter(event)} 
            />
        </div>
    );
};

export default Filter;