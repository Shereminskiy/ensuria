class ProcessListDto {
  /**
   *
   * @param {Array<Payments>}payments
   * @returns {Array<Object<id: number>>}
   */
  static populate(payments) {
    return payments.map(({ id }) => ({ id}));
  }
}

export default ProcessListDto;
