import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.PG_URI
});

export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};