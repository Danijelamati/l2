import React from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from '../../Store/RootStore';

import { SpeciesDropdown } from '../../Components';


const Filter = observer( () => {
  
  const { listPageStore } = useRootStore();
  
  return (
    <div className="filter">
      <p className="filter-para">Filter:</p>
      <input
        className="filter-input"
        type="text"
        onChange={(event) => listPageStore.setFilter(event.target.value)}
        value={typeof listPageStore.listOptions.filter === "string" ? listPageStore.listOptions.filter : "species:"+listPageStore.listOptions.filter.map(e =>e.name)}
      />
      {
        listPageStore.mode === "list" && (
          <SpeciesDropdown 
            onChange={e => listPageStore.selectSpecies(e.target.value)} 
            multi={true}
          />
        )
      }      
    </div>
  );
});

export default Filter;
