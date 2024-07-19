import { PRECISION } from '../../../constants.js';

class PayoutListDto {
  /**
   *
   * @param {Array<Payments>} payments
   * @returns {{amount: number, payments: Object<{id: number, payout: number}>}}
   */
  static populate(payments) {
    let total = 0;
    const paymentList = payments.map(({ id, payout }) => {
      total += payout;
      return {
        id,
        amount: payout / PRECISION,
      };
    });

    return {
      total_amount: total / PRECISION,
      payments: paymentList,
    };
  }
}

export default PayoutListDto;
