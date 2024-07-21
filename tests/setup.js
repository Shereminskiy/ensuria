const { PostgreSqlContainer } = require('@testcontainers/postgresql');
const dotenv = require('dotenv-flow');
dotenv.config();

let postgresContainer = false;

global.projectDir = __dirname + '/..';

module.exports = async () => {
  if (postgresContainer) {
    console.log('Terminate Postgres docker image');
    await postgresContainer.stop();
  } else {
    console.info('Run Postgres docker images');

    postgresContainer = await new PostgreSqlContainer('postgres')
      .withDatabase(process.env.DB_NAME)
      .withUsername(process.env.DB_USER)
      .withPassword(process.env.DB_PASSWORD)
      .withExposedPorts(+process.env.DB_PORT)
      .start();

    process.env.DB_PORT = postgresContainer.getPort();

    const {
      default: { knex, config },
    } = await import('../services/knex.js');

    console.log(`Connected to DB: ${JSON.stringify(config.connection)}`);
    // run migration
    const [, migrations] = await knex.migrate.latest();

    console.log(`Executed migrations:`, migrations);

    // run seeds
    const [seeds] = await knex.seed.run({
      directory: __dirname + '/fixtures',
    });

    console.log(`Executed seeds:`, seeds);
  }
};
