import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import jsyaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import swaggerValidation from 'openapi-validator-middleware';
import { ForbiddenError } from '@casl/ability';
import knex from './services/knex.js';
import SettingsRouter from './routes/settings/index.js';
import ShopRouter from './routes/shops/index.js';
import PaymentsRouter from './routes/payments/index.js';

console.log(`Connected to DB: ${JSON.stringify(knex.config.connection)}`);

const spec = fs.readFileSync('swagger.yml', 'utf8');
const swaggerDocument = jsyaml.load(spec);
swaggerValidation.init('swagger.yml');

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

app.use('/settings', SettingsRouter);
app.use('/shops', ShopRouter);
app.use('/payments', PaymentsRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.json(new createError.NotFound());
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof swaggerValidation.InputValidationError) {
    return res.status(400).json(err);
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: err.message });
  }

  if (err instanceof ForbiddenError) {
    return res.status(403).send({
      message: 'Access forbidden',
    });
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

export default app;
