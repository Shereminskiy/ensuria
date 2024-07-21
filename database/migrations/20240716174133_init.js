exports.up = (knex) => {
  return knex.schema
    .createTable('settings', (table) => {
      table.increments();
      table.string('name', 32);
      table.double('value', 2);
    })
    .then(function () {
      return knex('settings').insert([
        { name: 'commission_a', value: 25 * 1000 }, // 25грн
        { name: 'commission_b', value: 5 },
        { name: 'commission_d', value: 15 },
      ]);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTable('settings');
};
