//require no useCase

const  postNews = (req,res) => {
    if(req.method !== 'POST'){
        res.writeHead(405,{'Contet-type':'text/plain'});   
        res.end();
    }
    else return
}

module.exports = {
    postNews
}