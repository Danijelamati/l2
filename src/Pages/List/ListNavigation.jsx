import React from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from '../../Store/RootStore';

import './ListNavigation.css';

const ListNavigation = observer(() => {
  const { listPageStore } = useRootStore();

  return (
    <div className="list-navigation">
      <button
        name="pageDown"
        className="list-navigation-button"
        onClick={() => listPageStore.navigatePage("prevPage",listPageStore.listOptions.page - 1)}
        type="button"
      >
        {'<'}
      </button>
      <p>{listPageStore.listOptions.page}</p>
      <button
        name="pageUp"
        className="list-navigation-button"
        onClick={() => listPageStore.navigatePage("nextPage",listPageStore.listOptions.page + 1)}
        type="button"
      >
        {'>'}
      </button>
    </div>
  );
});

export default ListNavigation;
