import { observer } from 'mobx-react';
import React from 'react';
import PropTypes from 'prop-types';

import { useRootStore } from '../../Store/RootStore';

const Table = observer((props) => {

    const { content, header } = props;

    const { listPageStore } = useRootStore();
   
    return (
        <div className="table">
            {header(listPageStore)}
            {content(listPageStore)}
        </div>
    );
});

Table.propTypes = {
    content: PropTypes.func,
    header: PropTypes.func
};

export default Table;