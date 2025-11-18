const pool = require("../db");

const advancedSearchJobs = async (req, res) => {
  const { title, location, keyword, job_type, job_industry, job_experience } =
    req.query;

  try {
    const sql = `
            SELECT * FROM job_listings
            WHERE
                ($1 IS NULL OR LOWER(job_title) LIKE LOWER('%' || $1 || '%'))
            AND ($2 IS NULL OR LOWER(job_location) LIKE LOWER('%' || $2 || '%'))
            AND ($3 IS NULL OR $3 = ANY(job_keywords))
            AND ($4 IS NULL OR job_type = $4)
            AND ($5 IS NULL OR job_industry = $5)
            AND ($6 IS NULL OR job_experience_level = $6);
        `;

    const params = [
      title || null,
      location || null,
      keyword || null,
      job_type || null,
      job_industry || null,
      job_experience || null,
    ];

    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};

module.exports = { advancedSearchJobs };
