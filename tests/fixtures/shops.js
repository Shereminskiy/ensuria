exports.seed = (knex) => {
  return knex('shops')
    .del()
    .then(function () {
      return knex('shops').insert([
        { name: 'ATB', commission_c: 3, id: 1 },
        { name: 'Comfy', commission_c: 5, id: 2 },
      ]);
    });
};
