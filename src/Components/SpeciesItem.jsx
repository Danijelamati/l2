import React from 'react';
import { Link } from 'react-router-dom';

import './SpeciesItem.css';

function SpeciesItem(props) {

    const { species, editLink} = props;

    return (
        <div className="species-item">
            <p className="item">{species.name}</p>
            <p className="item">{species.abrv}</p>
            {
                editLink && (
                    <Link
                      to={{
                        pathname: editLink,
                        species: {...species},
                      }}
                    >
                      <p className="item">Edit</p>
                    </Link>
                    )
            }
        </div>
    );
}

export default SpeciesItem;