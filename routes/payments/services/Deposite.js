import { PRECISION } from '../../../constants.js';

class Deposit {
  PAYMENT_LIMIT = 500; // 500грн

  /**
   * @returns {number}
   */
  getPaymentLimit() {
    return this.PAYMENT_LIMIT * PRECISION;
  }

  /**
   *
   * @param {Payments} payment
   *
   * @returns {boolean}
   */
  isDepositRequired(payment) {
    return payment.amount >= this.getPaymentLimit();
  }
}

export default new Deposit();
