
const  updateNews = (req,res) => {
    if(req.method !== 'PUT'){
        res.writeHead(405,{'Contet-type':'text/plain'});   
        res.end();
    }
    
    return
}

module.exports = {
    updateNews
}