// 👉Example 1: Using ES module Import/Export
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// 👉Example 2: Using ES module API Promise
import fs from 'fs/promises';

const responseHandler = (req, res, next) => {
  // Example: Basic
  // fs.readFile('my-page.html', 'utf8', (err, data) => {
  //   res.send(data);
  // });

  // 👉 Example 1: With ES module: some global variables not
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename);
  res.sendFile(path.join(__dirname, 'my-page.html'));

  // 👉Example 2: Using ES module API Promise
  fs.readFile('my-page.html', 'utf8')
    .then((data) => res.send(data))
    .catch(error => console.log(error));
};

export default responseHandler;
