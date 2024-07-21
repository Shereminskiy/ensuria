import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile.js';

const environment = process.env.NODE_ENV || 'development';

console.log(`Working environments : ${environment}`);
const config = knexConfig[environment];

const knex = Knex(config);
Model.knex(knex);

export default { knex, config };
