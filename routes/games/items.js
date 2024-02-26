const v = require('express-validator');
const mongoose = require('mongoose');
const router = require('express').Router();
const Item = mongoose.model('Item');
const auth = require('../auth');
const helper = require('../helper');
const itemSvc = require('../../services/item.service');

// Preload item objects on routes with ':itemId'
router.param('itemId', function(req, res, next, itemId) {
  Item.findById(itemId).then(function(item) {
      if (!item) { return res.sendStatus(404); }
      req.item = item;
      return next();
    }).catch(next);
});

// Get item.
router.get('/:itemId',
  auth.required,
  helper.createRouter(async function({ item }) {
    return { item }
  })
);

// Get items.
router.get('/',
  auth.required,
  helper.createRouter(async function({ game }) {
    return await itemSvc.getItems(game);
  })
);

// Create a new item.
router.post('/',
  auth.required,
  v.body('name').notEmpty(),
  helper.validate,
  helper.createRouter(async function({ game, body }) {
    return await itemSvc.createItem(game, body);
  })
);

// Delete a item
router.delete('/:itemId',
  auth.required, 
  helper.createRouter(async function({ item }) {
    return await itemSvc.deleteItem(item);
  })
);

module.exports = router;
