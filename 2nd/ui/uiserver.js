const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

app.use(express.static('public'));

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };
const apiProxyTarget = process.env.API_PROXY_TARGET;

if (apiProxyTarget) {
  app.use('/graphql', createProxyMiddleware({ target: apiProxyTarget, changeOrigin: true }));
}

app.get('/env.js', (req, res) => {
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

const port = process.env.UI_SERVER_PORT || 8000;

app.listen(port, () => {
  console.log(`UI started on port ${port}`);
});
