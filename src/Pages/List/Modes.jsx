import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { useRootStore } from '../../Store/RootStore';

const Modes = observer(() => {

    const { listPageStore } = useRootStore(); 

    return (
      <div>
        <Link
          to={{
                        pathname: '/create',
                        entity: listPageStore.mode === "list" ? "caracter" : "species"
                    }}
        >
          <button type="button">
            Create
          </button>                    
        </Link>   
        <div>
          <button 
            value="species" 
            onClick={(event) => listPageStore.manageMode(event.target.value)}
            type="button"
          >
            Species
          </button>
          <button 
            value="list" 
            onClick={(event) => listPageStore.manageMode(event.target.value)}
            type="button"
          >
            Caracters
          </button>                   
        </div> 
      </div>
    );
});

export default Modes;