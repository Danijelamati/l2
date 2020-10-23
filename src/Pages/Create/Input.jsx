import React from 'react';

import { useRootStore } from '../../Store/RootStore';

function Input() {

    const { addPageStore } = useRootStore();

    return (
      <div className="input">            
        <div>
          <p className="new-name">New name:</p>
          <input
            className="new-input"
            type="text"
            onSelect={(event) => addPageStore.setInput(event.target.name, event.target.value)}
            name="name"
          />
        </div>
        <div>
          <p>New abrv:</p>
          <input
            className="new-input"
            type="text"
            onSelect={(event) => addPageStore.setInput(event.target.name, event.target.value)}
            name="abrv"
          />
        </div>
      </div>
    );
}

export default Input;