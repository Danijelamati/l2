export default function quickSort(data, property) {
    
    if(data.length <= 1){
        return data;
    }

    const lesser = [];
    const equal = [];
    const greater = [];

    for(let e of data){

        if(e[property] > data[0][property]){
            greater.push(e);
            continue;
        }

        if(e[property] < data[0][property]){
            lesser.push(e);
            continue;
        }

        equal.push(e);
    }

    return [...quickSort(lesser, property), ...equal, ...quickSort(greater, property)];

};