// 👉Using ES module import instead of module export
import express from "express";
import responseHandler from './response-handler.js';

const app = express();
const PORT = 3000;
const MESS = `Server is running: http://localhost:${PORT}`;

app.get('/', responseHandler);

app.listen(PORT, () => console.log(MESS));
