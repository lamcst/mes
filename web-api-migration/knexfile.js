
require('dotenv').config()

module.exports = {
  client: 'pg',
  connection: process.env.PG_CONNECTION_URI,
  pool: {
    min: 2,
    max: 10,
  },
};
