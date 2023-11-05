const http = require('http');
// Case 1
const httpRequestHandler = require('./routes');
const server = http.createServer(httpRequestHandler);

// Case 2 - Case 3
// const routes = require('./routes');
// const server = http.createServer(routes.handler);


// Listen event
server.listen({ port: 3000, host: 'localhost' }, () => console.log("Server is running: http://localhost:3000 "));
