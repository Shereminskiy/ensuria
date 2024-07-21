import dotenv from 'dotenv-flow';

if (!process.env.DB_PORT) {
  dotenv.config();
}

const serverConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
  },
  migrations: {
    tableName: 'migrations',
    directory: './database/migrations',
    disableMigrationsListValidation: true,
  },
};

export default {
  development: {
    ...serverConfig,
    pool: { min: 0, max: 10 },
  },
  production: {
    ...serverConfig,
    pool: { min: 0, max: 10 },
  },
  testing: {
    ...serverConfig,
    pool: { min: 0, max: 2 },
  },
};
