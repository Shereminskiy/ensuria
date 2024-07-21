const { Model } = require('objection');
const PaymentHistory = require('./PaymentHistory');

/**
 * Payments model
 */
class Payments extends Model {
  static get tableName() {
    return 'payments';
  }

  async $afterUpdate(opt, queryContext) {
    await super.$afterUpdate(opt, queryContext);
    const { old } = opt;

    await PaymentHistory.query().insert({
      payment_id: old.id,
      metadata: old,
    });
  }

  static get relationMappings() {
    return {
      shop: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Shops.js`,
        join: {
          from: 'payments.shop_id',
          to: 'shops.id',
        },
      },
      history: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/PaymentHistory`,
        join: {
          from: 'payments.id',
          to: 'payment_history.payment_id',
        },
      },
    };
  }
}

module.exports = Payments;
