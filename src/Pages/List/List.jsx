import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useRootStore } from '../../Store/RootStore';

import { CaracterContent, Filter, Elements, Modes, Table, CaracterHeader, SpeciesContent, SpeciesHeader } from './index';

import './index.css';

const List = observer(() => {
  
  const { listPageStore, tableStore } = useRootStore();

  useEffect(
    () => {      
      (async () => {
      if(listPageStore.loaded){
        await listPageStore.setSpecies();
        return;
      }
      if (tableStore.list.length > 0) {
        listPageStore.setLoaded(true);
        return;
      }  
      
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
