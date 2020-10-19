import React from 'react';

import { useRootStore } from '../../Store/RootStore';

import ListNavigation from './ListNavigation';

import './Elements.css';

function Elements() {
  const { listPageStore } = useRootStore();

  const submitElements = (event, aStore) => {
    aStore.setElements(parseInt(event.target.value, 10));
  };

  return (
    <div className="list-elements">
      <div className="list-element-number">
        <p>Number of elements per page:</p>
        <input
          className="list-element-number-input"
          type="number"
          onChange={(event) => submitElements(event, listPageStore)}
          defaultValue={listPageStore.listOptions.elementsPerPage}
        />
      </div>
      <ListNavigation />
    </div>
  );
}

export default Elements;
