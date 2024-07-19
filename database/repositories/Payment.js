import BaseRepository from "./Base.js";
import Payments from '../models/Payments.js';
import Shops from '../models/Shops.js';
import {PAYMENT_STATE} from "../../constants.js";

class PaymentRepository extends BaseRepository
{
    /**
     * @param {Object<*>} item
     * @returns {Promise<Payments>}
     */
    async findBy(item) {
        return Payments.query().findOne(item);
    }

    /**
     * @param {Object<*>} data
     * @returns {Promise<Payments>}
     */
    async create(data = {}) {
        return Payments.query().insertAndFetch(data);
    }

    /**
     *
     * @param {Array<number>} ids
     * @param {Object<*>} where
     * @returns {Objection.QueryBuilder<Payments, Payments[]>}
     */
    async findAllByIds(ids = [], where = {} ) {
        return Payments.query().withGraphFetched('shop').whereIn('id', ids).andWhere(where);
    }

    /**
     *
     * @param {Object<*>} where
     * @returns {Objection.QueryBuilder<Payments, Payments[]>}
     */
    async findAllBy(where = {}) {
        return Payments.query().withGraphFetched('shop').where(where).debug();
    }

    /**
     *
     * @param {number} shop_id
     * @param {string} interval
     * @returns {Objection.QueryBuilder<Payments, Payments[]>}
     */
    async findAllReadyToPayByShopId(shop_id, interval = '1 day') {
        return Payments.query()
        .withGraphJoined('shop')
        .whereIn('state', [PAYMENT_STATE.PROCESSED, PAYMENT_STATE.COMPLETED])
        .andWhere('shop.id', shop_id)
        .andWhereRaw(`now() > shop.payout_at + interval '${interval}'`);
    }

    /**
     *
     * @param {integer} shop_id
     * @param {Array<Payments>} payments
     * @returns {Promise<Objection.Transaction>}
     */
    async performPayment(shop_id, payments = []){
        return Payments.transaction(async trx => {
            let payout = 0;

            const promises = [];
            for (const payment of payments) {
                promises.push(payment.$query(trx).update({
                    state: PAYMENT_STATE.PAID,
                    updated_at: new Date().toISOString(),
                }));

                payout += payment.payout;
            }

            await Promise.all(promises);
            const shop = await Shops.query(trx).findOne({id: shop_id}).debug()

            await shop.$query(trx).update({
                balance: shop.balance += payout,
                payout_at: new Date().toISOString()
            });
        });
    }
}

export default new PaymentRepository();
