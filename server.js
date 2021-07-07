const http = require('http');
const router = require('./app/routes');

const server = http.createServer((req, res) => {

    try {
        router.initRoute(req, res);
    }
    catch (error) {
        res.writeHead(400, { 'Contet-type': 'text/plain' });
        res.end();
    }

});

server.listen(3000);