const { Model } = require('objection');

/**
 * Shops model
 */
class Shops extends Model {
  static get tableName() {
    return 'shops';
  }

  static get relationMappings() {
    return {
      payments: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Payments`,
        join: {
          from: 'shops.id',
          to: 'payments.shop_id',
        },
      },
    };
  }
}

module.exports = Shops;
