import { makeObservable, observable, action } from "mobx";

export default class NewSpeciesStore{

    @observable name;

    @observable abrv;
    
    constructor(){
        makeObservable(this);
        this.name = "";
        this.abrv = "";
    }

    @action
    initialise(){
        this.name = "";
        this.abrv = "";
    }

    @action
    setValue(name,value){
        this[name] = value;
    }    

};