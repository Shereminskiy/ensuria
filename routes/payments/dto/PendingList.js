class PendingListDto {
  /**
   *
   * @param {Array<Payments>} payments
   * @returns {Array<Object<id: number, commission_d: number, payout: number, amount: number, shop: Object<id: number, name: string>>>}
   */
  static populate(payments) {
    return payments.map(({ id, shop, commission_d, payout, amount }) => ({
      id,
      commission_d,
      payout,
      amount,
      shop: {
        id: shop.id,
        name: shop.name,
      },
    }));
  }
}

export default PendingListDto;
