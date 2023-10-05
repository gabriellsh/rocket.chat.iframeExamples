import express from 'express';
import path from 'path';
import fetch from 'node-fetch';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3003;

const getApiURL = (endpoint: string) => {
  const apiURL = new URL('http://localhost:3000/');

  apiURL.pathname = `/api/v1/${endpoint}`;
  return apiURL.toString();
}

const loginURL = getApiURL('login');

// Serve index.html
app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.resolve(__dirname, '../src/client/index.html'));
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Proxy login request to API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const fetchResult = await fetch(loginURL, { method: 'post', body: JSON.stringify({ username, password }), headers: { 'Content-Type': 'application/json' } });

  res.json(await fetchResult.json());
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
