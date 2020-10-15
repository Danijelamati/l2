import { makeAutoObservable } from 'mobx';

import firebase from '../Common/util/firebase';

export default (RootStore) => makeAutoObservable({
  list: [],
  setList(newList) {
    this.list = [...newList];
  },
  async fetchList() {
    const fList = async () => {
      const { listOptions } = RootStore.appStore;
      const db = firebase.firestore();
      let arr = db.collection('list');

      if (listOptions.filter) {
        arr = arr.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
      }

      if (listOptions.reverse) {
        arr = await arr
          .orderBy(listOptions.orderBy)
          .orderBy('id')
          .limitToLast(listOptions.elementsPerPage)
          .get();

        this.setList(arr.docs.map((d) => ({ ...d.data() })).reverse());
      } else {
        arr = await arr
          .orderBy(listOptions.orderBy)
          .orderBy('id')
          .limit(listOptions.elementsPerPage)
          .get();
        this.setList(arr.docs.map((d) => ({ ...d.data() })));
      }
    };
    return await fList();
  },
  nextPage(value) {
    const { appStore } = RootStore;
    const { listOptions } = RootStore.appStore;

    if (this.list.length < listOptions.elementsPerPage) {
      return;
    }

    if (listOptions.reverse) {
      (async () => {
        const db = firebase.firestore();

        let ref = db.collection('list');

        if (listOptions.filter) {
          ref = ref.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
        }

        ref = await ref
          .orderBy(listOptions.orderBy)
          .orderBy('id')
          .endBefore(
            this.list[this.list.length - 1][listOptions.orderBy],
            this.list[this.list.length - 1].id,
          )
          .limitToLast(listOptions.elementsPerPage)
          .get();

        const nextList = [...ref.docs.map((d) => ({ ...d.data() }))].reverse();

        if (!nextList.length) {
          return;
        }
        appStore.setListOptionsProperty('page', value);
        this.setList(nextList);
      })();
      return;
    }
    (async () => {
      const db = firebase.firestore();

      let ref = db.collection('list');

      if (listOptions.filter) {
        ref = ref.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
      }

      ref = await ref
        .orderBy(listOptions.orderBy)
        .orderBy('id')
        .startAfter(this.list[this.list.length - 1][listOptions.orderBy], this.list[this.list.length - 1].id)
        .limit(listOptions.elementsPerPage)
        .get();

      const nextList = [...ref.docs.map((d) => ({ ...d.data() }))];

      if (!nextList.length) {
        return;
      }
      appStore.setListOptionsProperty('page', value);
      this.setList(nextList);
    })();
  },
  prevPage(value) {
    const { appStore } = RootStore;
    const { listOptions } = RootStore.appStore;

    if (value < 1) {
      return;
    }
    if (listOptions.reverse) {
      (async () => {
        const db = firebase.firestore();

        let ref = db.collection('list');

        if (listOptions.filter) {
          ref = ref.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
        }

        ref = await ref
          .orderBy(listOptions.orderBy)
          .orderBy('id')
          .startAfter(this.list[0][listOptions.orderBy], this.list[0].id)
          .limit(listOptions.elementsPerPage)
          .get();

        appStore.setListOptionsProperty('page', value);
        this.setList([...ref.docs.map((d) => ({ ...d.data() }))].reverse());
      })();
      return;
    }
    (async () => {
      const db = firebase.firestore();

      let ref = db.collection('list');

      if (appStore.listOptions.filter) {
        ref = ref.where('filter', 'array-contains', listOptions.filter.toLocaleLowerCase());
      }

      ref = await ref
        .orderBy(listOptions.orderBy)
        .orderBy('id')
        .endBefore(this.list[0][listOptions.orderBy], this.list[0].id)
        .limitToLast(listOptions.elementsPerPage)
        .get();

      appStore.setListOptionsProperty('page', value);
      this.setList([...ref.docs.map((d) => ({ ...d.data() }))]);
    })();
  },
});
