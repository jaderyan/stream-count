const app = require('./server');
const port = require('./config');

const PORT = port.PORT[process.env.NODE_ENV];

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
