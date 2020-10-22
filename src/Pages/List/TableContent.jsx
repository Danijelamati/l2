import { observer } from 'mobx-react';
import React from 'react';

import { useRootStore } from '../../Store/RootStore';
import ListItem from '../../Components/ListItem';
import SpeciesItem from '../../Components/SpeciesItem';

import './TableContent.css';

const TableContent = observer(() => {
  const { listStore, listPageStore, speciesListStore } = useRootStore();

  return (
    <div className="table">
      {
      listPageStore.mode === "caracter" && (
              listStore.list.map((e) => (
                <ListItem
                  key={e.id}
                  item={e}
                  editLink="/edit"
                />
              ))
        )
      }
      {
      listPageStore.mode === "species" && (
              speciesListStore.speciesList.map((e) => (
                <SpeciesItem
                  key={e.id}
                  species={e}
                  editLink="/edit"
                />
              ))
        )
      }
    </div>
  );
});

export default TableContent;
