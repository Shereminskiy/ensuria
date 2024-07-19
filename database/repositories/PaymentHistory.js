import BaseRepository from './Base.js';
import PaymentHistory from '../models/PaymentHistory.js';

class PaymentHistoryRepository extends BaseRepository {
  /**
   * @param {Object<*>} item
   * @returns {Promise<PaymentHistory>}
   */
  async findBy(item) {
    return PaymentHistory.query().findOne(item);
  }

  /**
   *
   * @param {Object<*>} where
   * @returns {Objection.QueryBuilder<PaymentHistory, PaymentHistory[]>}
   */
  async findAllBy(where = {}) {
    return PaymentHistory.query().where(where).orderBy('created_at', 'DESC');
  }
}

export default new PaymentHistoryRepository();
