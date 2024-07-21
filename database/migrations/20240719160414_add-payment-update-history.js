exports.up = (knex) => {
  return knex.schema.createTable('payment_history', (table) => {
    table.increments();
    table.integer('payment_id').unsigned().notNullable().references('payments.id').onDelete('CASCADE').index();
    table.jsonb('metadata');
    table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('payment_history');
};
