const searchNews = (req, res) => {
    if (req.method !== 'GET') {
        serverResponse(res, 405, 'bad_method')
        return
    }

    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', async () => {
        const newsBody = JSON.parse(data);

        if (Object.keys(newsBody).toString() !== ['search_input'].toString()) {
            serverResponse(res, 400, "bad_req_body");
            return
        }

        if (typeof newsBody['search_input'] !== 'string') {
            serverResponse(res, 400, 'input_not_string')
            return
        }

        if ((/^\s*$/).test(newsBody['search_input'])) {
            serverResponse(res, 400, 'empty_input');
            return
        }

        newsBody['search_input'] = newsBody['search_input'].toLowerCase().trim();

        serverResponse(res, 200, 'success', 'searchedNews')
    });
}

const serverResponse = (res, statusCode, resultCase, dbRes = '') => {
    let message;
    res.writeHead(statusCode, { 'Contet-type': 'text/plain' });

    switch (resultCase) {
        case 'bad_req_body': message = 'Malformed request body.';
            break;
        case 'empty_input': message = 'Empty input is not allowed.';
            break;
        case 'input_not_string': message = 'Data input not allowed';
            break
        case 'db_error': message = 'We are going through some technical issues, please try again later.';
            break
        case 'success': message = `${JSON.stringify(dbRes)}`
    }
    res.write(message);
    res.end();
}

module.exports = {
    searchNews
}