exports.up = (knex) => {
  return knex.schema.createTable('payments', (table) => {
    table.increments();
    table.integer('shop_id').unsigned().notNullable().references('shops.id').onDelete('CASCADE').index();
    table.integer('amount').defaultTo(0);
    table.enu('state', ['new', 'processed', 'pending', 'completed', 'paid']).defaultTo('new');
    table.integer('commission_a').defaultTo(0);
    table.integer('commission_b').defaultTo(0);
    table.integer('commission_c').defaultTo(0);
    table.integer('commission_d').defaultTo(0);
    table.integer('payout').defaultTo(0);
    table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
    table.datetime('updated_at');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('payments');
};
