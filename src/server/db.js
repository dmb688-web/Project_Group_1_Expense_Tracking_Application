const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CS-312",
  password: "Baseball0108",
  port: 5432,
});

module.exports = pool;
