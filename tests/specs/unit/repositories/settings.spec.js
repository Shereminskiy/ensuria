const { describe, expect, it, beforeAll } = require('@jest/globals');

describe('Settings Repository:', () => {
  beforeAll(async () => {
    const knex = await import(global.projectDir + '/services/knex');
  });

  it('Get platform commission settings', async () => {
    const { default: settingsRepository } = await import(global.projectDir + '/database/repositories/Settings.js');
    const platformCommissions = await settingsRepository.getPlatformCommission();

    expect(platformCommissions).toHaveProperty('commission_a.value', 25000);
    expect(platformCommissions).toHaveProperty('commission_b.value', 5);
    expect(platformCommissions).toHaveProperty('commission_d.value', 15);
  });
});
