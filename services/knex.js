import knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile.js';

Model.knex(knex(knexConfig));

export default knex;
