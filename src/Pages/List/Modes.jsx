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
                        entity: listPageStore.mode
                    }}
        >
          <button type="button">
            Create
          </button>                    
        </Link>   
        <div>
          <button 
            value="species" 
            onClick={(event) => listPageStore.menageMode(event.target.value)}
            type="button"
          >
            Species
          </button>
          <button 
            value="caracter" 
            onClick={(event) => listPageStore.menageMode(event.target.value)}
            type="button"
          >
            Caracters
          </button>                   
        </div> 
      </div>
    );
});

export default Modes;