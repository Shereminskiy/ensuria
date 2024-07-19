import { Router } from 'express';
import swaggerValidation from 'openapi-validator-middleware';
import Settings from '../../database/models/Settings.js';
import SettingsListDto from './dto/SettingsList.js';
import { PRECISION } from '../../constants.js';

const SettingsRouter = Router();

SettingsRouter.get('/', async (req, res, next) => {
  try {
    const SettingsList = await Settings.query();
    return res.json(SettingsListDto.populate(SettingsList));
  } catch (error) {
    next(error);
  }
});

SettingsRouter.put('/', swaggerValidation.validate, async (req, res, next) => {
  try {
    const { commission_d, commission_a, commission_b } = req.body;
    await Promise.all([
      Settings.query().update({ value: commission_d }).where('name', 'commission_d'),
      Settings.query()
        .update({ value: commission_a * PRECISION })
        .where('name', 'commission_a'),
      Settings.query().update({ value: commission_b }).where('name', 'commission_b'),
    ]);

    const SettingsList = await Settings.query();

    return res.json(SettingsListDto.populate(SettingsList));
  } catch (error) {
    next(error);
  }
});

export default SettingsRouter;
