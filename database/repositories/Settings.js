import _ from 'lodash';
import BaseRepository from "./Base.js";
import Settings from '../models/Settings.js';
import { SETTINGS } from '../../constants.js';

class SettingsRepository extends BaseRepository
{
    /**
     * @param {Object<*>} item
     * @returns {Promise<Settings>}
     */
    async findBy(item) {
        return Settings.query().findOne(item);
    }

    /**
     * @param {Object<*>} data
     * @returns {Promise<Settings>}
     */
    async create(data) {
        return Settings.query().insertAndFetch(data);
    }

    /**
     * @returns {Promise<Dictionary<Settings>>}
     */
    async getPlatformCommission() {
        const settings = await Settings.query().whereIn('name', [
            SETTINGS.COMMISSION_A,
            SETTINGS.COMMISSION_B,
            SETTINGS.COMMISSION_D
        ]);

        return _.keyBy(settings, 'name');
    }
}

export default new SettingsRepository();
