import React from 'react';
import PropTypes from 'prop-types';

import { useRootStore } from '../Store/RootStore';

function SpeciesDropdown(props) {

    const { onChange, multi} = props;

    const { speciesStore } = useRootStore();

    return (
        <>
            <select className="select-checkbox" onChange={onChange} multiple={multi} >
                <option key="def" value="">Select species</option>
                {speciesStore.dropdown.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>           
       </>
    );
}

SpeciesDropdown.propTypes = {
    onChange: PropTypes.func,
    multi: PropTypes.bool
};

export default SpeciesDropdown;