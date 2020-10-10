import React from 'react';
import { observer } from 'mobx-react';

import { useAppStore } from '../../Store/appStore';

import './ListNavigation.css';

const ListNavigation = observer(() =>{

    const appStore = useAppStore();

    const handlePage = (event, store) => {
        event.preventDefault();
        store.setPage(event.target.name);
    };

    return (
      <div className="list-navigation">
        <button 
          name="pageDown" 
          className="list-navigation-button" 
          onClick={(event) => handlePage(event,appStore)}
          type="button"
        >
          {"<"}
        </button>
        <p>{appStore.listOptions.page}</p>
        <button 
          name="pageUp" 
          className="list-navigation-button" 
          onClick={(event) => handlePage(event,appStore)}
          type="button"
        >
          {">"}
        </button>
      </div>
    );
});

export default ListNavigation;