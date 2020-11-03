import { observer } from 'mobx-react';
import React from 'react';

import { useRootStore } from '../../Store/RootStore';

import { SpeciesItem } from '../../Components';

const TableContent = observer(() => {
  
  const { tableStore } = useRootStore();

  return (
    <>      
      {      
        tableStore.list.map((e) => (
            <SpeciesItem
                key={e.id}
                species={e}
                editLink="/edit"
            />
        ))        
      }
    </>
  );
});

export default TableContent;
