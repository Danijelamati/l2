import React from 'react';
import { Link } from 'react-router-dom';

import './ListItem.css';

function ListItem(props) {
    
    const { id, makeId, makeName, makeAbrv, name, abrv} = props.item;
    const { editLink } = props;   
    
    return (
        <div className={"listItem"}>
            <p className={"item"}>{makeName}</p>
            <p className={"item"}>{makeAbrv}</p>
            <p className={"item"}>{name}</p>
            <p className={"item"}>{abrv}</p>       
            {
                editLink && 
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
                    <p className={"item"}>Edit</p>
                </Link>                
            }    
        </div>
    );
}

export default ListItem;


