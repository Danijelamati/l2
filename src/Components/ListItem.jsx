import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

import './ListItem.css';

function ListItem({item, editLink}) {
    
    const { id, makeId, makeName, makeAbrv, name, abrv} = item;     
    
    return (
      <div className="listItem">
        <p className="item">{makeName}</p>
        <p className="item">{makeAbrv}</p>
        <p className="item">{name}</p>
        <p className="item">{abrv}</p>       
        {
                editLink && (
                <Link 
                  to={{
                        pathname: editLink,
                        editProps: {
                            id,
                            makeId,
                            makeName,
                            makeAbrv,
                            name,
                            abrv
                        }
                    }}                     
                >
                  <p className="item">Edit</p>
                </Link>
              )
}    
      </div>
    );
}


ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired, 
    makeId: PropTypes.string.isRequired, 
    makeName: PropTypes.string.isRequired, 
    makeAbrv: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired, 
    abrv: PropTypes.string.isRequired
  }).isRequired,
  editLink: PropTypes.string  
};

ListItem.defaultProps = {
  editLink: ""
};


export default ListItem;


