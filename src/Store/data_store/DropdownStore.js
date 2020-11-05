import { makeObservable, observable, action } from 'mobx';

export default class DropdownStore {
    
    @observable dropdown;

    constructor(){
        makeObservable(this);
        this.dropdown = [];
    }

    @action
    setDropdown(array){
        this.dropdown = array;
    }    

    @action
    clean(){
        this.dropdown = [];
    }

    findById(id){
        return {...this.dropdown.find((s) => s.id === id)};
    }
    
};