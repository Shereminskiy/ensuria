import { Router } from 'express';
import swaggerValidation from 'openapi-validator-middleware';
import Shops from '../../database/models/Shops.js';

const ShopRouter = Router();

ShopRouter.get('/', async (req, res, next) => {
  try {
    const shopsList = await Shops.query().withGraphFetched('payments');
    return res.json(shopsList);
  } catch (error) {
    next(error);
  }
});

ShopRouter.post('/', swaggerValidation.validate, async (req, res, next) => {
  try {
    const { name, commission_c } = req.body;
    const shop = await Shops.query().insert({
      name,
      commission_c: +commission_c.toFixed(2),
    });
    return res.json({ id: shop.id });
  } catch (error) {
    next(error);
  }
});

export default ShopRouter;
