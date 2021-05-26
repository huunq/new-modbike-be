module.exports = {
    development: {
      client: "mysql",
      connection: {
        host:  'localhost',
        user: 'root',
        password: 'root',
        database: 'modbike'
        // host:  process.env.HOST_DEV_DB,
        // user: process.env.USER_DEV_DB,
        // password: process.env.PASSWORD_DEV,
        // database: process.env.DATABASE_DEV_DB
      },
      migrations: {
        directory: './src/db/migrations',
      },
      seeds: {
        directory: './src/db/seeds',
      },
    },
  };
  