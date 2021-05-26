const environment = "development";
const config = require("../../knexfile");
const enviromentConfig = config[environment];
const knex = require("knex");
const connection = knex(enviromentConfig);

module.exports = connection;