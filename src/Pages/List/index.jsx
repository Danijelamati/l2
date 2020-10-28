import React, { useEffect} from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from '../../Store/RootStore';

import Filter from './Filter';
import Elements from './Elements';
import Modes from './Modes';
import Table from './Table';
import CaracterHeader from './CaracterHeader';
import CaracterContent from './CaracterContent';
import SpeciesContent from './SpeciesContent'; 
import SpeciesHeader from './SpeciesHeader'; 

import './index.css';

const List = observer(() => {
  
  const { listPageStore, tableStore } = useRootStore();

  useEffect(
    () => {      
      if(listPageStore.loaded){
        return;
      }
      if (tableStore.list.length > 0) {
        listPageStore.setLoaded(true);
        return;
      } 
      
      (async () => {
        await listPageStore.initialise();
      })();
      
    }, [listPageStore, tableStore],
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
              <Table 
                header={(listPgStore) => {
                          if(listPgStore.mode === "list"){                              
                            return <CaracterHeader />
                          }else{                              
                            return <SpeciesHeader />
                          }
                        }}
                content={(listPgStore) => {
                      if(listPgStore.mode === "list"){
                        return <CaracterContent />
                      }else{
                        return <SpeciesContent />
                      }
                }}    
              />                                        
              <Elements />
            </div>
          )
      }  
    </>  
  );
});

export default List;
