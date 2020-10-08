import React from 'react';

import { useAppStore } from '../../App';
import ListNavigation from './ListNavigation';

import './Paginations.css';

function Pagination () {

    const appStore = useAppStore();

    const submitElementNumber = (store, value) => {
        store.setElements(parseInt(value, 10));
    };

    return (
        <div className={"list-pagination"}>
            <div className={"list-element-number"}>
                <p>Number of elements per page:</p>
                <input
                     className={"list-element-number-input"} 
                     type={"number"} 
                     onChange={event => submitElementNumber(appStore, event.target.value)} 
                     defaultValue={appStore.listOptions.elementsPerPage}
                />
            </div> 
            <ListNavigation />                       
        </div>
    );
};

export default Pagination;