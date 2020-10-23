import React from 'react';

import { useRootStore } from '../../Store/RootStore';

import TableContent from './TableContent';
import TableHeader from './TableHeader';
import SpeciesHeader from './SpeciesHeader';
import { observer } from 'mobx-react';

const Table = observer(() => {

    const { listPageStore } = useRootStore();
    
    return (
        <>
            {listPageStore.mode === "caracter" && <TableHeader />}
            {listPageStore.mode === "species" && <SpeciesHeader />}
            <TableContent /> 
        </>
    );
});

export default Table;