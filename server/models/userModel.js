import { Pool } from 'pg';

const PG_URI = 'postgres://waajwpef:oV4vRHcXXEGPK8T712j_rOh1BURf_Sw8@jelani.db.elephantsql.com/waajwpef';

const pool = new Pool({
  connectionString: PG_URI
});

export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};