import { Router } from 'express';
import swaggerValidation from 'openapi-validator-middleware';
import createError from 'http-errors';
import debug from 'debug';
import SettingsRepository from '../../database/repositories/Settings.js';
import ShopRepository from '../../database/repositories/Shop.js';
import PaymentRepository from '../../database/repositories/Payment.js';
import PaymentHistoryRepository from '../../database/repositories/PaymentHistory.js';
import DepositService from './services/Deposite.js';
import { PAYMENT_STATE, PRECISION } from '../../constants.js';
import { getCommissionAmount } from './services/Commission.js';
import { PaymentHistoryListDto, PayoutListDto, PendingListDto, ProcessListDto } from './dto/index.js';

const PaymentsRouter = Router();

PaymentsRouter.post('/', swaggerValidation.validate, async (req, res, next) => {
  try {
    const { shop_id, amount } = req.body;

    const shop = await ShopRepository.findBy({ id: shop_id });
    if (!shop) {
      throw new createError.NotFound('Shop not found');
    }

    const amountInSemiCoins = amount * PRECISION;
    const payment = await PaymentRepository.create({ shop_id, amount: amountInSemiCoins });

    return res.json({ id: payment.id });
  } catch (error) {
    next(error);
  }
});

PaymentsRouter.get('/process', swaggerValidation.validate, async (req, res, next) => {
  try {
    const payments = await PaymentRepository.findAllBy({ state: PAYMENT_STATE.NEW });

    return res.json(ProcessListDto.populate(payments));
  } catch (error) {
    next(error);
  }
});

PaymentsRouter.put('/process', swaggerValidation.validate, async (req, res, next) => {
  try {
    const { payment_ids } = req.body;
    const success = [];
    const failed = [];

    const payments = await PaymentRepository.findAllByIds(payment_ids, { state: PAYMENT_STATE.NEW });
    const platformCommissions = await SettingsRepository.getPlatformCommission();

    for (const payment of payments) {
      const isDepositRequired = DepositService.isDepositRequired(payment);

      const commissionB = getCommissionAmount(platformCommissions.commission_b.value, payment.amount);
      const commissionC = getCommissionAmount(payment.shop.commission_c, payment.amount);
      const commissionD = getCommissionAmount(platformCommissions.commission_d.value, payment.amount);
      const payoutAmount = payment.amount - platformCommissions.commission_a.value - commissionB - commissionC;

      await PaymentRepository.update(payment, {
        state: PAYMENT_STATE.PROCESSED,
        updated_at: new Date().toISOString(),
        commission_a: platformCommissions.commission_a.value,
        commission_b: commissionB,
        commission_c: commissionC,
        payout: payoutAmount,
        ...(isDepositRequired
          ? {
              state: PAYMENT_STATE.PENDING,
              commission_d: commissionD,
              payout: payoutAmount - commissionD,
            }
          : {}),
      })
        .then(() => {
          success.push(payment.id);
        })
        .catch((error) => {
          debug.log(error.message);
          failed.push({
            paymentId: payment.id,
            error: error.message,
          });
        });
    }

    return res.json({ success, failed });
  } catch (error) {
    next(error);
  }
});

PaymentsRouter.get('/complete', swaggerValidation.validate, async (req, res, next) => {
  try {
    const payments = await PaymentRepository.findAllBy({ state: PAYMENT_STATE.PENDING });

    return res.json(PendingListDto.populate(payments));
  } catch (error) {
    next(error);
  }
});

PaymentsRouter.put('/complete', swaggerValidation.validate, async (req, res, next) => {
  try {
    const { payment_ids } = req.body;
    const success = [];
    const failed = [];

    const payments = await PaymentRepository.findAllByIds(payment_ids, { state: PAYMENT_STATE.PENDING });

    for (const payment of payments) {
      await PaymentRepository.update(payment, {
        state: PAYMENT_STATE.COMPLETED,
        payout: payment.payout + payment.commission_d,
        updated_at: new Date().toISOString(),
      })
        .then(() => {
          success.push(payment.id);
        })
        .catch((error) => {
          debug.log(error.message);
          failed.push({
            paymentId: payment.id,
            error: error.message,
          });
        });
    }

    return res.json({ success, failed });
  } catch (error) {
    next(error);
  }
});

PaymentsRouter.put('/pay', swaggerValidation.validate, async (req, res, next) => {
  try {
    const { shop_id } = req.body;
    const payments = await PaymentRepository.findAllReadyToPayByShopId(shop_id);
    await PaymentRepository.performPayment(shop_id, payments);

    return res.json(PayoutListDto.populate(payments));
  } catch (error) {
    next(error);
  }
});

PaymentsRouter.get('/:id/history', swaggerValidation.validate, async (req, res, next) => {
  try {
    const history = await PaymentHistoryRepository.findAllBy({ payment_id: req.params.id });

    return res.json(PaymentHistoryListDto.populate(history));
  } catch (error) {
    next(error);
  }
});

export default PaymentsRouter;
