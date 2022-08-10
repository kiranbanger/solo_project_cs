const { Pool } = require('pg');
const PG_URI = 'postgres://ybevvpxx:hLP-R2XRWTXT-gOmjyIIcfMZsrvHBHxa@heffalump.db.elephantsql.com/ybevvpxx'

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executing query: ', text);
    return pool.query(text, params, callback);
  }
}