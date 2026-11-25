const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Redirect legacy/relative links to their canonical routes
app.get('/bomberos.html', (req, res) => {
  res.redirect(301, '/bomberos/');
});

app.get('/bomberos/recursos.html', (req, res) => {
  res.redirect(301, '/recursos.html');
});

app.get(['/home', '/home/home'], (req, res) => {
  res.redirect(301, '/');
});

// Prevent exposing server/build config files over HTTP
const blockedFiles = new Set([
  '/server.js',
  '/package.json',
  '/package-lock.json',
  '/metadata.json',
  '/build.js',
  '/build.py',
  '/bomberos/update-balotarios.py',
]);

app.use((req, res, next) => {
  if (blockedFiles.has(req.path)) {
    return res.status(404).send('Not found');
  }
  next();
});

// Serve static HTML, CSS, JS, and image assets
app.use(express.static(path.join(__dirname), {
  extensions: ['html'],
}));

app.listen(PORT, HOST, () => {
  console.log(`Static site server running at http://${HOST}:${PORT}`);
});
