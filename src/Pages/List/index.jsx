import React, { useEffect} from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from '../../Store/RootStore';

import Filter from './Filter';
import Elements from './Elements';
import Modes from './Modes';
import Table from './Table';

import './index.css';

const List = observer(() => {
  const { listPageStore, listStore } = useRootStore();
  
  useEffect(
    () => {
      if(listPageStore.loaded){
        return;
      }
      if (listStore.list.length > 0) {
        listPageStore.setLoaded(true);
        return;
      } 
      
      (async () => {
        await listPageStore.initialise();
      })();
      
    }, [listPageStore, listStore],
  );

  return (   
    <> 
      { 
                !listPageStore.loaded
                  ? <p>loading.....</p>
                  : (
                    <div className="list">
                      <Filter />
                      <Modes />    
                      <Table />                  
                      <Elements />
                    </div>
                  )
      }  
    </>  
  );
})

export default List;
