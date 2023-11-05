
const fs = require('fs');

const httpRequestHandler = (request, response) => {
  const URL = request.url;
  const METHOD = request.method;

  if (URL === '/') {
    response.write(`
      <html>
        <head>
          <title>NodeJS Basic</title>
        </head>

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

  if (URL === '/message' && METHOD === 'POST') {
    const body = [];
    request.on('data', (chuck) => {
      console.log(chuck);
      body.push(chuck);
    });

    return request.on('end', () => {
      const parserBody = Buffer.concat(body).toString();
      const message = parserBody.split('=')[1];

      fs.writeFile('textMessage.txt', message, (errorMessage) => {
        console.log(errorMessage);
        response.statusCode = 302;
        response.setHeader('Location', '/');
        return response.end();
      })
    })
  }

  response.setHeader('Content-Type', 'text/html');
  response.write(`
    <html>
      <head>
        <title>NodeJS Basic</title>
      </head>

      <body>
        <h1>Hello Node</h1>
      </body>
    </html>
  `);
  response.end();
}

// Case 1
module.exports = httpRequestHandler;

// Case 2
// module.exports = {
//   handler: httpRequestHandler,
// }

// Case 3
// exports.handler = httpRequestHandler;
