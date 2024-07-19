/**
 *
 * @param {number} commission
 * @param {number} amount
 *
 * @returns {number}
 */
export const getCommissionAmount = (commission = 0, amount = 0) => {
  return parseInt((commission * amount) / 100);
};
