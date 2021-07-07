
const  searchNews = (req,res) => {
    if(req.method !== 'GET'){
        res.writeHead(405,{'Contet-type':'text/plain'});   
        res.end();
    }
    
    return
}

module.exports = {
    searchNews
}