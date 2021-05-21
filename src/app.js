const express = require('express');
const routes = require('./routes')
const port = 5000;

const app = express();

app.use(routes)

app.listen(port, () => {
  console.log(`Arco da Velha is running on port ${port}.`);
});

