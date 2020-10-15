import React, { useEffect, useState } from 'react';

import { useRootStore } from '../../Store/RootStore';

import Filter from './Filter';
import TableContent from './TableContent';
import TableHeader from './TableHeader';
import Pagination from './Pagination';

import './index.css';

function List() {
  const { listStore } = useRootStore();

  const [loaded, setLoaded] = useState(false);

  useEffect(
    () => {
      if (listStore.list.length > 0) {
        setLoaded(true);
        return;
      }

      (async () => {
        await listStore.fetchList();
        setLoaded(true);
      })();
    }, [listStore],
  );

  return (
    <>
      {
                !loaded
                  ? <p>loading.....</p>
                  : (
                    <div className="list">
                      <Filter />
                      <TableHeader />
                      <TableContent />
                      <Pagination />
                    </div>
                  )
      }
    </>
  );
}

export default List;
