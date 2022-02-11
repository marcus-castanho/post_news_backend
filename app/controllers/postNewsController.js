const { createNews } = require('../useCases/postNewsUseCase');

const postNews = (req, res) => {
  if (req.method !== 'POST') {
    serverResponse(res, 405, 'bad_method');
    return
  }

  let data = '';

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', async () => {
    const newsBody = JSON.parse(data);

    if (Object.keys(newsBody).toString() !== ['title', 'content', 'category'].toString()) {
      serverResponse(res, 400, 'bad_req_body')
      return
    }

    for (let field in newsBody) {
      if ((/^\s*$/).test(newsBody[field])) {
        serverResponse(res, 400, 'empty_input')
        return
      }
      newsBody[field] = newsBody[field].toLowerCase().trim();
    }

    const createdNews = await createNews(newsBody);

    if (createdNews == undefined) {
      serverResponse(res, 503, 'db_error');
      return
    }

    serverResponse(res, 200, 'success', createdNews);
  });
}

const serverResponse = (res, statusCode, resultCase, dbRes = '') => {
  let message;
  res.writeHead(statusCode, { 'Contet-type': 'text/plain' });

  switch (resultCase) {
      case 'bad_req_body': message = 'Malformed request body.';
          break;
      case 'empty_input': message = 'Empty fields are not allowed.';
          break;
      case 'db_error': message = 'We are going through some technical issues, please try again later.';
          break
      case 'success': message = `${JSON.stringify(dbRes)}`
  }
  res.write(message);
  res.end();
}

module.exports = {
  postNews
}