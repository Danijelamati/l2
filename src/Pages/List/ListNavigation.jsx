import React from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from '../../Store/RootStore';

import './ListNavigation.css';

const ListNavigation = observer(() => {
  const { appStore, listStore } = useRootStore();

  return (
    <div className="list-navigation">
      <button
        name="pageDown"
        className="list-navigation-button"
        onClick={() => listStore.prevPage(appStore.listOptions.page - 1)}
        type="button"
      >
        {'<'}
      </button>
      <p>{appStore.listOptions.page}</p>
      <button
        name="pageUp"
        className="list-navigation-button"
        onClick={() => listStore.nextPage(appStore.listOptions.page + 1)}
        type="button"
      >
        {'>'}
      </button>
    </div>
  );
});

export default ListNavigation;
