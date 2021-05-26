const {findNews} = require('../useCases/searchNewsUseCase');

const  searchNews = (req,res) => {
    if(req.method !== 'GET'){
        res.writeHead(405,{'Contet-type':'text/plain'});   
        res.end();
    }

    const searchStr = '';

    findNews(searchStr);
    
    return
}

module.exports = {
    searchNews
}