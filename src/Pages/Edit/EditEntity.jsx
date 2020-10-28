import { observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';

const EditEntity = observer((props) =>  {

    const { save, entity, render } = props;

    const { editPageStore } = useRootStore();

    return (
        <div>
            {render(editPageStore)}
            <button
                      onClick={() => save(editPageStore,entity)}
                      type="button"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                            editPageStore.setRedirect(true);
                            }}
                      type="button"
                    >
                      Cancel
                    </button> 
        </div>
    );
});

EditEntity.propTypes = {
    save: PropTypes.func,
    entity: PropTypes.shape(),
    render: PropTypes.func
};

export default EditEntity;