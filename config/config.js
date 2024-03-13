require('dotenv').config();


const dbUrl = process.env.JAWSDB_URL ? new URL(process.env.JAWSDB_URL) : null;

const username = dbUrl ? dbUrl.username : process.env.DB_USER;
const password = dbUrl ? dbUrl.password : process.env.DB_PASSWORD;
const host = dbUrl ? dbUrl.hostname : 'localhost';
const port = dbUrl ? dbUrl.port : 3306;
const database = dbUrl ? dbUrl.pathname.slice(1) : process.env.DB_NAME;

module.exports = {
  development: {
    username: username,
    password: password,
    database: database,
    host: host,
    port: port,
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'JAWSDB_URL',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
