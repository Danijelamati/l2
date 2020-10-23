import React from 'react';

import { useRootStore } from '../../Store/RootStore';

function SpeciesHeader() {   

    const { listPageStore } = useRootStore();
    
    const handleClick = (value, listPgStore) => {
        listPgStore.setOrderBy(value);
    };
  
    return (
      <div className="table-header">
        <h3
          className="table-header-names"
          onClick={() => handleClick('name', listPageStore)}
        >
          Species
        </h3>
        <h3
          className="table-header-names"
          onClick={() => handleClick('abrv', listPageStore)}
        >
          Species Abrv
        </h3>  
        <h3
          className="table-header-names"
        >
          Edit
        </h3>
      </div>      
    );
  };

export default SpeciesHeader;