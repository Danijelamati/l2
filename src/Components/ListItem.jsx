import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './ListItem.css';

function ListItem({ item, editLink }) {
  const {
    id, makeId, makeName, makeAbrv, name, abrv,
  } = item;
  
  return (
    <div className="listItem">
      <p className="item">{name}</p>
      <p className="item">{abrv}</p>
      <p className="item">{makeName}</p>
      <p className="item">{makeAbrv}</p>      
      {
                editLink && (
                <Link
                  to={{
                    pathname: editLink,
                    caracter: {
                      id,
                      makeId,
                      makeName,
                      makeAbrv,
                      name,
                      abrv,
                    },
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
    id: PropTypes.string,
    makeId: PropTypes.string,
    makeName: PropTypes.string,
    makeAbrv: PropTypes.string,
    name: PropTypes.string,
    abrv: PropTypes.string,
  }).isRequired,
  editLink: PropTypes.string,
};

ListItem.defaultProps = {
  editLink: "",
  id: "",
  makeId: "",
  makeName: "",
  makeAbrv: "",
  name: "",
  abrv: ""
};

export default ListItem;
