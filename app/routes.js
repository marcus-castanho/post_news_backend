const {searchNews} = require('./controllers/searchNewsController');
const {deleteNews} = require('./controllers/deleteNewsController');
const {postNews} = require('./controllers/postNewsController');
const {updateNews} = require('./controllers/updateNewsController');

class Router {
    constructor(){
        this.routes = [
            '/',
            '/news/post',
            '/news/update',
            '/news/search',
            '/news/delete'
        ]
    }
    initRoute(req,res){
        const path = req.url.toLowerCase(); 

        if(!this.routes.includes(path)){
            res.writeHead(404,{'Contet-type':'text/plain'});   
            res.end();
        }

        if(path == '/'){
            res.writeHead(200,{'Contet-type':'text/plain'});   
            res.end();
        }
        
        switch(path) {
            case '/news/post': postNews(req,res);
                break;
            case '/news/update': updateNews(req,res);
                break;
            case '/news/search': searchNews(req,res);
                break;
            case '/news/delete': deleteNews(req,res);
                break;
            default:
                return
        }

        return
    }
}

module.exports = new Router();