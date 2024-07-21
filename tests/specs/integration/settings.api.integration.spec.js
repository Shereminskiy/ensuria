const { describe, it, expect } = require('@jest/globals');
const request = require('supertest');

describe('Settings API integration:', () => {
  it('GET /settings - should fetch settings', async () => {
    const { default: app } = await import('../../../app.js');

    return await request(app)
      .get('/settings')
      .then((res) => {
        const expectedSettings = [
          { name: 'commission_a', value: 25000 },
          {
            name: 'commission_b',
            value: 5,
          },
          { name: 'commission_d', value: 15 },
        ];

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
        expect(res.body).toEqual(expectedSettings);
      });
  });
});
