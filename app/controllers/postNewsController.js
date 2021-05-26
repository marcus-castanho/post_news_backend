const {createNews} = require('../useCases/postNewsUseCase');

const  postNews = (req,res) => {
    if(req.method !== 'POST'){
        res.writeHead(405,{'Contet-type':'text/plain'});   
        res.end();
    }

    let data = '';

    req.on('data', chunk => {
      data += chunk;
    })
    req.on('end', () => {
      const newsBody = JSON.parse(data);

      createNews(newsBody);

      res.end();
    });

}

module.exports = {
    postNews
}