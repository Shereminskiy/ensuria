# Ensuria payment API

Running the Express locally requires a few steps.

1. Copy the `.env.example` to `.env` and make the necessary updates (auth0)
2. Run the Docker Command `docker-compose up`
3. Run migrations `knex migrate:latest`
4. Run `npm run start:dev`
5. Open swagger page `http://localhost:8082/api-docs/`

### Unit tests

For running tests we use Jest.

Run integration tests:
> `npm run test:unit`

Code coverage will be in the folder `/coverage/unit/lcov-report/index.html`

### Integration tests

For running tests we use Jest.

Run integration tests:
> `npm run test:integration`

Code coverage will be in the folder `/coverage/integration/lcov-report/index.html`

### create migration

> knex migrate:make some_name --env ENV_NAME

### rum migrations

> knex migrate:latest --env ENV_NAME

### rollback migrations

> knex migrate:rollback --env ENV_NAME
