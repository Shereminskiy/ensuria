const { Model } = require('objection');

/**
 * Settings model
 */
class Settings extends Model {
  static get tableName() {
    return 'settings';
  }
}

module.exports = Settings;
