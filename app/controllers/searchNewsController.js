//require no model (usecase?)

const  searchNews = (req,res) => {
    if(req.method !== 'GET'){
        res.writeHead(405,{'Contet-type':'text/plain'});   
        res.end();
    }
    else return
}

module.exports = {
    searchNews
}