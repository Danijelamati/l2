import { makeAutoObservable } from 'mobx';

const initialState = {
  orderBy: 'name',
  reverse: false,
  elementsPerPage: 10,
  page: 1,
  filter: '',
};

export default ({ listStore }) => makeAutoObservable({
  listOptions: { ...initialState },
  resetOptions() {
    this.listOptions = { ...initialState };
  },
  setListOptionsProperty(property, value) {
    this.listOptions[property] = value;
  },
  setFilter(value) {
    this.listOptions.filter = value;
    this.listOptions.page = 1;
    listStore.fetchList();
  },
  setElements(value) {
    if (value < 1 || !value) {
      return;
    }

    this.listOptions.elementsPerPage = value;
    this.listOptions.page = 1;
    listStore.fetchList();
  },
  setOrderBy(sortParam) {
    if (sortParam !== this.listOptions.orderBy) {
      this.listOptions.orderBy = sortParam;
      this.listOptions.reverse = false;
    } else {
      this.listOptions.reverse = !this.listOptions.reverse;
    }
    this.listOptions.page = 1;
    listStore.fetchList();
  },
  setPage(value) {
    if (value < 1) {
      return;
    }

    this.listOptions.page = value;
    listStore.fetchList();
  },

});
