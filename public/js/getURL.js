let url=require('url') 
const getPath=(req) => { 
    return req.url; 
} 
const getParamsURL=(req)=>{ 
    let urlData = url.parse(req.url, true); 
    return JSON.stringify(urlData.query); 
} 
export default {getPath, getParamsURL}