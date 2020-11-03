import React from 'react';

import { useRootStore } from '../../Store/RootStore';

import { ListNavigation } from './index';

function Elements() {
  
  const { listPageStore } = useRootStore();

  return (
    <div className="list-elements">
      <div className="list-element-number">
        <p>Number of elements per page:</p>
        <input
          className="list-element-number-input"
          type="number"
          onChange={(event) => listPageStore.setElements(parseInt(event.target.value, 10))}
          defaultValue={listPageStore.listOptions.elementsPerPage}
        />
      </div>
      <ListNavigation />
    </div>
  );
}

export default Elements;
