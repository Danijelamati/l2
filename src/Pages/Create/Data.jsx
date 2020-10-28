import { observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';

const Data = observer((props) => {

    const { save, table } = props;

    const { addPageStore } = useRootStore();

    return (
        <div>    
            {table(addPageStore)}
            <div>
            {
                addPageStore.error && addPageStore.error
            }
            </div>
            <button
                onClick={() => save(addPageStore)}
                type="button"
            >
            Save
            </button> 
            <button                
                type="button"
                name="cancel"
                onClick={() => addPageStore.setRedirect(true)}
            >
                Cancel
            </button>
        </div>
    );
});

Data.propTypes ={
    save: PropTypes.func,
    table: PropTypes.func
};


export default Data;