class PaymentHistoryListDto {
  /**
   *
   * @param {Array<PaymentHistory>} histories
   * @returns {Array<Object<id: number>>}
   */
  static populate(histories) {
    return histories.map(
      ({
        created_at,
        metadata: { state, amount, payout, commission_a, commission_b, commission_c, commission_d },
      }) => ({
        created_at,
        state,
        commission_a,
        commission_b,
        commission_c,
        commission_d,
        amount,
        payout,
      })
    );
  }
}

export default PaymentHistoryListDto;
