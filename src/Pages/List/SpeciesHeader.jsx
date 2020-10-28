import React from 'react';

import { useRootStore } from '../../Store/RootStore';

function SpeciesHeader() {   

    const { listPageStore } = useRootStore();    
  
    return (
      <div className="table-header">
        <h3
          className="table-header-names"
          onClick={() => listPageStore.setOrderBy("name")}
        >
          Species
        </h3>
        <h3
          className="table-header-names"
          onClick={() => listPageStore.setOrderBy("abrv")}
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