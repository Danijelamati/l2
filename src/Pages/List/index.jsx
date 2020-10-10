import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import fetchFromStarWarsApi from '../../Common/util/fetchFromStarWarsApi';
import { Caracter, Species } from '../../Common/models/models';
import { useAppStore } from '../../Store/appStore';

import Filter from './Filter';
import TableContent from './TableContent';
import TableHeader from './TableHeader';
import Pagination from './Pagination';

import './index.css';


function List() {

    const appStore = useAppStore();

    const [loaded, setLoaded] = useState(false);    

    useEffect(
        () => {
            if(appStore.species.length > 0 && appStore.caracters.length > 0){
                setLoaded(true);
                return;
            }

            (async () => {

                const makefakeAbrv = (string) => {
                    return `${string[0]}${string[Math.trunc(string.length/2)]}${string[string.length-1]}`.toUpperCase().replace(" ", "C");
                };

                const speciesIdCollection = new Map();
                let i = 1;                

                let fetchedSpecies = await fetchFromStarWarsApi("https://swapi.dev/api/species/");
                fetchedSpecies = fetchedSpecies.map(e => {
                    const id = nanoid();
                    speciesIdCollection.set(i, id);
                    i+=1;
                    return new Species(
                        id, 
                        e.name, 
                        makefakeAbrv(e.name));
                });
                
                
                let fetchedCaracters = await fetchFromStarWarsApi("https://swapi.dev/api/people/");
                fetchedCaracters = fetchedCaracters.filter(e => e.species.length)
                                             .map(e => (
                                                new Caracter( 
                                                    nanoid(),
                                                    speciesIdCollection.get(parseInt(e.species[0].split("/")[e.species[0].split("/").length - 2], 10)),
                                                    e.name, 
                                                    makefakeAbrv(e.name))
                                                ));
      
                appStore.species = [...fetchedSpecies];
                appStore.caracters = [...fetchedCaracters];

                appStore.fillList();                       
                setLoaded(true);

            })();
        }, [appStore]
      );

    return (
      <>
        {
                !loaded ? 
                  <p>loading.....</p>
                : (
                  <div className="list">                    
                    <Filter />
                    <TableHeader />                    
                    <TableContent />
                    <Pagination />
                  </div>
              )
}            
      </>
    );
};

export default List;