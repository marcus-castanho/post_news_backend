
const  deleteNews = (req,res) => {
    if(req.method !== 'DELETE'){
        res.writeHead(405,{'Contet-type':'text/plain'});   
        res.end();
    }
    
    return
}

module.exports = {
    deleteNews
}