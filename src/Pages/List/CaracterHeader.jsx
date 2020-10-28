import React from 'react';

import { useRootStore } from '../../Store/RootStore';

function TableHeader() {
  const { listPageStore } = useRootStore();

  return (
    <div className="table-header">      
      <h3
        className="table-header-names"
        onClick={() => listPageStore.setOrderBy("id") }
      >
        Caracter
      </h3>
      <h3
        className="table-header-names"
        onClick={() => listPageStore.setOrderBy("id") }
      >
        Caracter Abrv
      </h3>
      <h3
        className="table-header-names"
        onClick={() => listPageStore.setOrderBy("id") }
      >
        Species
      </h3>
      <h3
        className="table-header-names"
        onClick={() => listPageStore.setOrderBy("id")}
      >
        Species Abrv
      </h3>
      <h3 className="table-header-names">Edit</h3>
    </div>
  );
}

export default TableHeader;
