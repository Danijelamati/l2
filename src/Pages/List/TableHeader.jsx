/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import { useAppStore } from '../../Store/appStore';

import './TableHeader.css';

function TableHeader() {
    
    const appStore = useAppStore();

    const handleClick = (e, value) => {
        e.preventDefault();
        appStore.setSort(value);
    };

    return (
      <div className="table-header">
        <h3 
          className="table-header-names" 
          onClick={e => handleClick(e, "makeName")}
        >
          Species
        </h3>
        <h3 
          className="table-header-names" 
          onClick={e => handleClick(e, "makeAbrv")}
        >
          Species Abrv
        </h3>
        <h3 
          className="table-header-names" 
          onClick={e => handleClick(e, "name")}
        >
          Caracter
        </h3>
        <h3 
          className="table-header-names" 
          onClick={e => handleClick(e, "abrv")}
        >
          Caracter Abrv
        </h3>            
        <h3 className="table-header-names">Edit</h3>                     
      </div>
    );
};

export default TableHeader;