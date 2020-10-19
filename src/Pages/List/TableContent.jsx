import { observer } from 'mobx-react';
import React from 'react';

import { useRootStore } from '../../Store/RootStore';
import ListItem from '../../Components/ListItem';

import './TableContent.css';

const TableContent = observer(() => {
  const { listStore } = useRootStore();

  return (
    <div className="table">
      {
              listStore.list.map((e) => (
                <ListItem
                  key={e.id}
                  item={e}
                  editLink="/edit"
                />
              ))
      }
    </div>
  );
});

export default TableContent;
