const http = require('http');
const router = require('./app/routes');

const server = http.createServer((req, res) => {

    router.initRoute(req, res);

    res.writeHead(200, { 'Contet-type': 'text/plain' });
    res.end();

});

server.listen(3000);