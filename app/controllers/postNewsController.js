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

  req.on('end', async () => {
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

    for (property in newsBody) {
      newsBody[property] = newsBody[property].toLowerCase().trim();
    }

    const createdNews = await createNews(newsBody);

    if (createdNews == undefined) {
      res.writeHead(503, { 'Contet-type': 'text/plain' });
      res.write('We are going through some technical issues, please try again later.');
      res.end();
      return
    }

    res.writeHead(200, { 'Contet-type': 'text/plain' });
    res.write(`${JSON.stringify(createdNews)}`);
    res.end();
  });
}

module.exports = {
  postNews
}