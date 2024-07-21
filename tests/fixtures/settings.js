exports.seed = (knex) => {
  return knex('settings')
    .del()
    .then(() => {
      return knex('settings').insert([
        { name: 'commission_a', value: 25 * 1000 }, // 25грн
        { name: 'commission_b', value: 5 },
        { name: 'commission_d', value: 15 },
      ]);
    });
};
