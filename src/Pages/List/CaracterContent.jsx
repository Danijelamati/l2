import { observer } from 'mobx-react';
import React from 'react';

import { useRootStore } from '../../Store/RootStore';

import { ListItem } from '../../Components';

const TableContent = observer(() => {
  const { tableStore } = useRootStore();

  return (
    <>
      {      
        tableStore.list.map((e) => (
            <ListItem
                key={e.id}
                item={e}
                editLink="/edit"
            />
        ))        
      }      
    </>
  );
});

export default TableContent;
