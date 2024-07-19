import dotenv from 'dotenv-flow';
dotenv.config();

export default {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    tableName: 'migrations',
    directory: './database/migrations',
    disableMigrationsListValidation: true,
  },
};
