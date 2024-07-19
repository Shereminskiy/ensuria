const { Model } = require('objection');

/**
 * Payment History model
 */
class PaymentHistory extends Model {
  static get tableName() {
    return 'payment_history';
  }
}

module.exports = PaymentHistory;
