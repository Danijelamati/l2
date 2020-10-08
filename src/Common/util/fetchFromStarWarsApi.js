import Axios from 'axios';

export default async (url) => {

    //for some reason api doesn't have option to fetch all data
    //so i had to go page by page 

    const allData = [];
    let page = url;
    let getPageData = null;
    
    do{             
        getPageData = await Axios.get(page);                   
        allData.push(...getPageData.data.results);
        page = getPageData.data.next;                  
       
    }while(page);
    
    return allData;
};