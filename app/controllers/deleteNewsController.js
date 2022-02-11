const { eraseNews } = require('../useCases/deleteNewsUseCase');

const deleteNews = (req, res) => {
    if (req.method !== 'DELETE') {
        serverResponse(res, 405, 'bad_method');
        return
    }

    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', async () => {
        const newsBody = JSON.parse(data);

        if (Object.keys(newsBody).toString() !== ['news_id', 'title', 'content', 'category'].toString()) {
            serverResponse(res, 400, 'bad_req_body');
            return
        }

        for (let field in newsBody) {
            if ((/^\s*$/).test(newsBody[field])) {
                serverResponse(res, 400, 'empty_input');
                return
            }

            if (newsBody[field] == 'string') {
                newsBody[field] = newsBody[field].toLowerCase().trim()
            }
        }

        const erasedNews = await eraseNews(newsBody);

        if (erasedNews == 'news_not_found') {
            serverResponse(res, 404, 'data_not_found', erasedNews);
            return
        }

        if (erasedNews == 'fail') {
            serverResponse(res, 503, 'db_error');
            return
        }

        serverResponse(res, 200, 'success');
    });

    return
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
            break;
        case 'data_not_found': message = 'Data not found.';
            break;
        case 'success': message = 'The requested news was deleted.';
            break;
    }
    res.write(message);
    res.end();
}

module.exports = {
    deleteNews
}