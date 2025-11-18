const pool = require("../db");

const autocompleteJobTitles = async (req, res) => {
  const { query } = req.query;

  const sql = `
        SELECT job_title
        FROM job_listings
        WHERE LOWER(job_title) LIKE LOWER($1 || '%')
        LIMIT 8;
    `;

  const result = await pool.query(sql, [query]);
  res.json(result.rows);
};

module.exports = { autocompleteJobTitles };
