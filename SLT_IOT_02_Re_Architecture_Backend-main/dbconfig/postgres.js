
const { Pool } = require('pg');

const pool = new Pool({
user: process.env.POSTGRES_USER,
host: process.env.POSTGRES_HOST,
database: process.env.POSTGRES_DATABASE,
password: process.env.POSTGRES_PASSWORD,
port: process.env.POSTGRES_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error('Unable to connect to Postgres:', err);
  } else {
    console.log('Connected to Postgres');
  }
});

module.exports = pool;

