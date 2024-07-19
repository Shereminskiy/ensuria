export const up = (knex) => {
    return knex.schema.createTable('shops', (table) => {
        table.increments();
        table.string('name', 32);
        table.integer('balance', 0).defaultTo(0);
        table.double('commission_c', 2).defaultTo(0);
        table.datetime('payout_at').defaultTo(knex.fn.now());
    }).then(function () {
            return knex("shops").insert([
                { name: 'ATB', commission_c: 3 },
                { name: 'Comfy', commission_c: 2.5 },
            ]);
        }
    );
};

export const down = (knex) => {
    return knex.schema.dropTable('shops');
};
