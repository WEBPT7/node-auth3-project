// require('dotenv').config();

const server = require("./api/server");

const PORT = process.env.port || 5000;

server.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
