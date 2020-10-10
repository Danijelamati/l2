import { observer } from 'mobx-react';
import React from 'react';

import { useAppStore } from '../../Store/appStore';
import ListItem from '../../Components/ListItem';

import './TableContent.css';

const TableContent = observer(() => {    

    const appStore = useAppStore();  

    return (
      <div className="table">           
        {
              appStore.getList().map( e => (
                <ListItem 
                  key={e.id}
                  item={e} 
                  editLink="/edit"
                />
)) 
           }
      </div>
    );
});

export default TableContent;