import BaseRepository from "./Base.js";
import Shop from '../models/Shops.js';

class ShopRepository extends BaseRepository
{
    /**
     * @param {Object<*>} item
     * @returns {Promise<Shop>}
     */
    async findBy(item) {
        return Shop.query().findOne(item);
    }

    /**
     * @param {Object<*>} data
     * @returns {Promise<Shop>}
     */
    async create(data) {
        return Shop.query().insertAndFetch(data);
    }
}

export default new ShopRepository();
