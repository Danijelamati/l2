import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';

import { Dropdown } from '../../Components';


const Filter = observer( (props) => {

  const { select } = props;
  
  const { listPageStore, dropdownStore } = useRootStore();
  
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
        select && (
          <Dropdown 
            onChange={e => listPageStore.selectSpecies(e.target.value)} 
            multi={true}
            options={() => dropdownStore.dropdown.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          />
        )
      }      
    </div>
  );
});

Filter.propTypes = {
  select: PropTypes.bool
};

export default Filter;
