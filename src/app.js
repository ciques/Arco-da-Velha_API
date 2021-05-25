const express = require('express');
const routes = require('./routes')
const port = 5000;

const app = express();

app.use(express.json());
app.use(routes)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({error: error.message})
})

app.listen(port, () => {
  console.log(`Arco da Velha is running on port ${port}.`);
});

