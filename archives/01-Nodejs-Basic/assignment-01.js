const http = require('http');

const server = http.createServer((request, response) => {
  const URL = request.url;
  const METHOD = request.method;

  // With route: "/"
  if (URL === '/') {
    console.log('Hello All!!!');
    response.setHeader('Content-Type', 'text/html');
    response.write(`
      <html>
        <head>
          <title>Assignment 01</title>
        </head>
        <body>
          <h1>Hello All!!!</h1>
          <form action="/create-user" method="POST">
            <input type="text" name="username"/>
            <button type="submit">Submit</button> 
          </form>
        </body>
      </html>
    `);
    return response.end();
  }

  // With route: "/users"
  if (URL === '/users') {
    response.setHeader('Content-Type', 'text/html');
    response.write(`
      <html>
        <head>
          <title>Assignment 01</title>
        </head>
        <body>
          <h1>List Users</h1>
          <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
          </ul>
        </body>
      </html>
    `);
    return response.end();
  }

  // With route: "/create-user" and method= POST
  if (URL === '/create-user' && METHOD === "POST") {
    const body = [];
    request.on('data', (chuck) => {
      console.log(chuck);
      body.push(chuck);
    });

    return request.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const userName = parseBody.split('=')[1];
      console.log(userName);
      response.statusCode = 302;
      response.setHeader('Location', '/');

      return response.end();
    })
  }

  // With URL not pound
  response.setHeader('Content-Type', 'text/html');
  response.write(`
    <html>
      <head>
        <title>Assignment 01</title>
      </head>
      <body>
        <h1>Page Not Pound</h1>
      </body>
    </html>
  `)
});

server.listen({ port: 3000 }, () => console.log(`Server is running: http://localhost:3000`))