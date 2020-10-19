import React, { useEffect} from 'react';
import { Observer } from 'mobx-react';

import { useRootStore } from '../../Store/RootStore';

import Filter from './Filter';
import TableContent from './TableContent';
import TableHeader from './TableHeader';
import Elements from './Elements';

import './index.css';

function List() {
  const { listPageStore, listStore } = useRootStore();

  useEffect(
    () => {
      if(listPageStore.loaded){
        return;
      }
      if (listStore.list.length > 0) {
        listPageStore.setLoaded(true);
        return;
      }
      (async () => {
        await listPageStore.initialise();
      })();
    }, [listPageStore, listStore],
  );

  return (
    <Observer>
      { () => (
                !listPageStore.loaded
                  ? <p>loading.....</p>
                  : (
                    <div className="list">
                      <Filter />
                      <TableHeader />
                      <TableContent />
                      <Elements />
                    </div>
                  )
       ) }
    </Observer>
  );
}

export default List;
