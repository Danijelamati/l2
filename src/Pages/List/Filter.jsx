import React from 'react';
import { useRootStore } from '../../Store/RootStore';

import './Filter.css';

const Filter = () => {
  const { listPageStore } = useRootStore();

  return (
    <div className="filter">
      <p className="filter-para">Filter:</p>
      <input
        className="filter-input"
        type="text"
        onChange={(event) => listPageStore.setFilter(event.target.value)}
        defaultValue={listPageStore.listOptions.filter}
      />
    </div>
  );
};

export default Filter;
