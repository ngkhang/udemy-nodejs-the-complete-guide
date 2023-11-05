const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === '/') {
    response.write(`
      <html>
        <head><title>NodeJS Basic</title></head>
        <body>
          <form action="/message" method="POST">
            <input name="messageInput" type="text" />
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
    return response.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    request.on('data', (chuck) => {
      console.log(chuck);
      body.push(chuck);
    });

    return request.on('end', () => {
      const parserBody = Buffer.concat(body).toString();
      const message = parserBody.split('=')[1];
      fs.writeFile('textMessage.txt', message, (error) => {
        console.log('Error message: ', error);
        response.statusCode = 302;
        response.setHeader('Location', '/');
        return response.end();
      })
    })
  }

  response.setHeader('Content-Type', 'text/html');
  response.write(`
  <html>
    <head><title>NodeJS basic</title></head>
    <body>
      <h1>Routing Requests</h1>
    </body>
  </html>
  `);
  response.end();
  // process.exit()  // 👈 Close server - Not use it
});


// Listen event
server.listen({ port: 3000, host: 'localhost' });
// server.listen(3000);
