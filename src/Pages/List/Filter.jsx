import React from 'react';
import { useRootStore } from '../../Store/RootStore';

import './Filter.css';

const Filter = () => {
  const { appStore } = useRootStore();

  return (
    <div className="filter">
      <p className="filter-para">Filter:</p>
      <input
        className="filter-input"
        type="text"
        onChange={(event) => appStore.setFilter(event.target.value)}
        defaultValue={appStore.listOptions.filter}
      />
    </div>
  );
};

export default Filter;
