import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useLocalObservable, Observer } from 'mobx-react';
import PropTypes from 'prop-types';

import ListItem from '../../Components/ListItem';
import compareObjects from '../../Common/util/compareObjects';
import { useRootStore } from '../../Store/RootStore';
import firebase from '../../Common/util/firebase';
import { Caracter, FullCaracter } from '../../Common/models/models';

import EditFields from './EditFields';
import EditProps from './EditProps';

import './index.css';

function Edit({ location }) {
  const { editProps } = location;

  const { appStore } = useRootStore();

  const [redirect, setRedirect] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const editStore = useLocalObservable(() => ({
    editCaracter: { ...editProps },
    species: [],
    setCaracterProperty(property, value) {
      this.editCaracter[property] = value;
    },
    async getSpecies() {
      const species = async () => {
        const db = firebase.firestore();

        const arr = await db.collection('species')
          .orderBy('name')
          .get();

        return arr.docs.map((d) => ({ ...d.data() }));
      };
      const a = await species();

      this.species = a;
      return true;
    },
  }));

  useEffect(() => {
    (async () => {
      await editStore.getSpecies();
      setLoaded(true);
    })();
  }, [editStore]);

  const saveCaracter = async (propCaracter, eStore, aStore, setRed) => {
    if (compareObjects(propCaracter, eStore.editCaracter)) {
      setRed(true);
      return;
    }

    const fullCar = new FullCaracter(
      eStore.editCaracter.id,
      eStore.editCaracter.makeId,
      eStore.editCaracter.makeName,
      eStore.editCaracter.makeAbrv,
      eStore.editCaracter.name,
      eStore.editCaracter.abrv,
    );
    fullCar.setFilter();

    const car = new Caracter(
      eStore.editCaracter.id,
      eStore.editCaracter.makeId,
      eStore.editCaracter.name,
      eStore.editCaracter.abrv,
    );
    const db = firebase.firestore();

    await db.collection('caracters').doc(car.id).set({ ...car });

    await db.collection('list').doc(fullCar.id).set({ ...fullCar });

    aStore.resetOptions();
    setRed(true);
  };

  return (
    <>
      {
                !editProps || redirect ? <Redirect to="/list" />
                  : loaded
                && (
                  <div className="edit">
                    <EditFields
                      editProps={editProps}
                      editStore={editStore}
                    />
                    <p>Preview:</p>
                    <div className="edit-list-item">
                      <EditProps />
                      <Observer>
                        {() => (
                          <ListItem
                            item={{
                              id: editStore.editCaracter.id,
                              makeId: editStore.editCaracter.makeId,
                              name: editStore.editCaracter.name,
                              abrv: editStore.editCaracter.abrv,
                              makeName: editStore.editCaracter.makeName,
                              makeAbrv: editStore.editCaracter.makeAbrv,
                            }}
                            key={editStore.editCaracter.id}
                          />
                        )}
                      </Observer>
                    </div>
                    <div>
                      <button
                        onClick={() => saveCaracter(editProps, editStore, appStore, setRedirect)}
                        type="button"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setRedirect(true)}
                        type="button"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )

}
    </>
  );
}

Edit.propTypes = {
  location: PropTypes.shape({
    editProps: PropTypes.shape(),
  }),
};

Edit.defaultProps = {
  location: '',
};

export default Edit;
