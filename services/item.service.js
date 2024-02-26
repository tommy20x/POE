const mongoose = require('mongoose');
const Item = mongoose.model('Item');

module.exports = {
  getItems: async function(game) {
    const items = await Item.find({ game: game.id });
    return { items };
  },

  createItem: async function(game, data) {
    const item = new Item({
      game: game.id,
      ...data
    });
    const saved = await item.save();
    return { item: saved };
  },

  deleteItem: async function(item) {
    return {
      item: await item.remove()
    }
  },
};