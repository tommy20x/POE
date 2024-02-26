const v = require('express-validator');
const mongoose = require('mongoose');
const router = require('express').Router();
const Item = mongoose.model('Item');
const Sale = mongoose.model('Sale');
const auth = require('../auth');
const helper = require('../helper');
const saleSvc = require('../../services/sale.service');

// Preload sale objects on routes with ':saleId'
router.param('saleId', function(req, res, next, saleId) {
  Sale.findById(saleId).then(function(sale) {
      if (!sale) { return res.sendStatus(404); }
      req.sale = sale;
      return next();
    }).catch(next);
});

// Get sale items.
router.get('/:saleId',
  auth.required,
  helper.createRouter(async function({ sale }) {
    return { item: sale }
  })
);

// Get sale items.
router.get('/',
  auth.required,
  helper.createRouter(async function({ payload }) {
    return await saleSvc.getItems(payload.id);
  })
);

// Create a new item.
router.post('/',
  auth.required,
  v.body('title').notEmpty(),
  v.body('content').notEmpty(),
  helper.validate,
  helper.createRouter(async function({ payload, game, body }) {
    return await saleSvc.createItem(payload.id, game, body);
  })
);

// Delete a item
router.delete('/:saleId',
  auth.required, 
  helper.createRouter(async function({ sale }) {
    return await saleSvc.deleteItem(sale);
  })
);

module.exports = router;
