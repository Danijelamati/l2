import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useLocalObservable, Observer } from 'mobx-react';

import ListItem from '../../Components/ListItem';
import { useAppStore } from '../../App';
import compareObjects from '../../Common/util/compareObjects';

import EditFields from './EditFields';
import EditProps from './EditProps';

import './index.css';

function Edit (props) {

    const appStore = useAppStore();  

    const [redirect, setRedirect] = useState(false);
    
    const editStore = useLocalObservable(() => ({
        editCaracter : {...props.location.editProps},
        setCaracterProperty(value,property){
            this.editCaracter[property] = value;
        },
        setCaracterSpecies(makeId, makeName, makeAbrv){
            this.editCaracter.makeId = makeId;
            this.editCaracter.makeName = makeName;
            this.editCaracter.makeAbrv = makeAbrv;
        },
        setRedirect(){
            this.redirect = true;
            console.log("here")
        }
    }));

    const saveCaracter = ( propCaracter, editStore, appStore, setRedirect) => {
        console.log(editStore.editCaracter)
        if(compareObjects(propCaracter, editStore.editCaracter)){
            setRedirect(true);
            return;
        }
        appStore.editCaracter(editStore.editCaracter);
        setRedirect(true);
    };  

    return (
        <>
            {        
                !props.location.editProps || redirect ? <Redirect to={"/list"} />
                :
                <div className={"edit"}>
                    <EditFields 
                        fullCaracter={props.location.editProps} 
                        editStore={editStore}
                    />
                    <p>Preview:</p>      
                    <div className={"edit-list-item"}>
                        <EditProps /> 
                        <Observer>
                            {()=>
                                <ListItem
                                    item={{
                                        id:editStore.editCaracter.id, 
                                        name: editStore.editCaracter.name,
                                        abrv: editStore.editCaracter.abrv,
                                        makeName: editStore.editCaracter.makeName,
                                        makeAbrv: editStore.editCaracter.makeAbrv
                                    }}                     
                                    key={editStore.editCaracter.id}
                                />
                            }                        
                        </Observer> 
                    </div>
                    <div>
                        <button onClick={() => saveCaracter(props.location.editProps, editStore, appStore, setRedirect)}>
                            Save
                        </button>
                        <button onClick={() => setRedirect(true)}>
                            Cancel
                        </button> 
                    </div>        
                </div>
            }            
        </>
    );
};

export default Edit;