//require no useCase

const  updateNews = (req,res) => {
    if(req.method !== 'PUT'){
        res.writeHead(405,{'Contet-type':'text/plain'});   
        res.end();
    }
    else return
}

module.exports = {
    updateNews
}