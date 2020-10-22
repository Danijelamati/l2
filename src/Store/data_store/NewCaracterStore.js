import { makeObservable, observable, action } from "mobx";

export default class NewCaracerStore{

    @observable name;

    @observable abrv;

    @observable selectedSpecies;
    
    constructor(){
        makeObservable(this);
        this.name = "";
        this.abrv = "";
        this.selectedSpecies = {};
    }

    @action
    initialise(){
        this.name = "";
        this.abrv = "";
        this.selectedSpecies = {};
    }

    @action
    setValue(name,value){
        this[name] = value;
    }

    @action
    setSpecies(species){       
        this.selectedSpecies = species; 
    }
};