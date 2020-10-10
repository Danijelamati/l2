import React from 'react';
import { useAppStore } from '../../Store/appStore';

import './Filter.css';

const Filter = () => {

    const appStore = useAppStore();

    const handleFilter = (event) => {
        event.preventDefault();
        appStore.filterList(event.target.value);
    };

    return (
      <div className="filter">
        <p className="filter-para">Filter:</p>
        <input 
          className="filter-input" 
          type="text" 
          onChange={event => handleFilter(event)}
          defaultValue={appStore.listOptions.filter}
        />
      </div>
    );
};

export default Filter;