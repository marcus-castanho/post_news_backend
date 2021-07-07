const { createNews } = require('../useCases/postNewsUseCase');

const postNews = (req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Contet-type': 'text/plain' });
    res.end();
  }

  let data = '';

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', () => {
    const newsBody = JSON.parse(data);

    if (Object.keys(newsBody).toString() !== ['title', 'content', 'category'].toString()) {
      res.writeHead(400, { 'Contet-type': 'text/plain' });
      res.write('Malformed request body.');
      res.end();
      return
    }

    for (let field in newsBody) {
      if ((/^\s*$/).test(newsBody[field])) {
        res.writeHead(400, { 'Contet-type': 'text/plain' });
        res.write('Empty fields are not allowed.');
        res.end();
        return
      }
    }

    createNews(newsBody);

    res.writeHead(200, { 'Contet-type': 'text/plain' });
    res.end();
  });

}

module.exports = {
  postNews
}