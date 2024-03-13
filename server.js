const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');

// Import Sequelize and session store
const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import database configurations
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.js')[env];

// Updated Sequelize initialization with dynamic configuration
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], {
        dialect: config.dialect,
        protocol: config.protocol, // This might not be necessary but included for completeness
        dialectOptions: config.dialectOptions,
    });
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        dialectOptions: config.dialectOptions,
    });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js as the template engine
const hbs = exphbs.create({
  helpers: {
    extend: function(context, options) {
      console.log('Extend helper called');
      return options.fn(context);
    },
    content: function(name, options) {
      if (!this.contents) this.contents = {};
      this.contents[name] = options.fn(this);
      return null;
    },
    block: function(name) {
      return this.contents && this.contents[name] ? this.contents[name] : '';
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up session with Sequelize store
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Sync sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
