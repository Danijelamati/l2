import React from 'react';
import PropTypes from 'prop-types';

function Dropdown(props) {

    const { onChange, multi, options } = props;

    return (
        <>
            <select onChange={onChange} multiple={multi} >
                <option key="def" value="">Select</option>
                {options()}
            </select>           
        </>
    );
}

Dropdown.propTypes = {
    onChange: PropTypes.func,
    multi: PropTypes.bool,
    options: PropTypes.func
};

export default Dropdown;