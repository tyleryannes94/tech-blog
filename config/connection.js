require('dotenv').config();
const { parse } = require('url');

// Parse the JawsDB URL, fallback to local .env variables if not available
const dbUrl = process.env.JAWSDB_URL || '';
const { hostname: host, port, pathname, auth } = url.parse(dbUrl);
const [username, password] = (auth || '').split(':');
const database = pathname ? pathname.slice(1) : '';

module.exports = {
  development: {
    username: process.env.DB_USER || username,
    password: process.env.DB_PASSWORD || password,
    database: process.env.DB_NAME || database,
    host: host,
    port: port || 3306,
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'JAWSDB_URL',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
