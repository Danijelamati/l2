import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useRootStore } from '../../Store/RootStore';

import Input from './Input';
import SpeciesData from './SpeciesData';
import CaracterData from './CaracterData';

import './index.css';


function Create({location}) {

    const { entity } = location;
    
    const { addPageStore } = useRootStore();
    
    const [ redirect, setRedirect] = useState(false);
    const [ loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!entity || (entity !== "caracter" && entity !== "species")){           
            setRedirect(true);
        }
        
        (async () => {
            await addPageStore.initialise(entity);
            setLoaded(true);
        })();

    },[entity,addPageStore]);

    return (
        <div>
            {
                redirect ? <Redirect to="/list" />
                :
                (
                    !loaded ? 
                    <p>loading...</p>
                    :
                    <>
                        <h1>new {addPageStore.mode}</h1>
                        <Input />
                        {addPageStore.mode === "species" && <SpeciesData />}
                        {addPageStore.mode === "caracter" && <CaracterData />}
                    </>   
                )
            }           
                       
        </div>
    );
}

export default Create;