import React from 'react';

import { useRootStore } from '../../Store/RootStore';

import './TableHeader.css';

function TableHeader() {
  const { listPageStore } = useRootStore();

  const handleClick = (value) => {
    listPageStore.setOrderBy(value);
  };

  return (
    <div className="table-header">
      <h3
        className="table-header-names"
        onClick={() => handleClick('makeName')}
      >
        Species
      </h3>
      <h3
        className="table-header-names"
        onClick={() => handleClick('makeAbrv')}
      >
        Species Abrv
      </h3>
      <h3
        className="table-header-names"
        onClick={() => handleClick('name')}
      >
        Caracter
      </h3>
      <h3
        className="table-header-names"
        onClick={() => handleClick('abrv')}
      >
        Caracter Abrv
      </h3>
      <h3 className="table-header-names">Edit</h3>
    </div>
  );
}

export default TableHeader;
