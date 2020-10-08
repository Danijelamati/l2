function Caracter (id, makeId, name, abrv){
    this.id = id;
    this.name = name;
    this.makeId = makeId;
    this.abrv = abrv;
};

function FullCaracter (id, makeId, makeName, makeAbrv, name, abrv){
    this.id = id;
    this.makeId = makeId;
    this.makeName = makeName;
    this.makeAbrv = makeAbrv;
    this.name = name;
    this.abrv = abrv;
};

function Species (id, name, abrv){
    this.id = id;
    this.name = name;
    this.abrv = abrv;
};

export{
    Caracter,
    FullCaracter,    
    Species
};