const mongoose = require('mongoose');
const Sale = mongoose.model('Sale');

module.exports = {
  getItems: async function(userId) {
    const items = await Sale.find({ user: userId });
    return { items };
  },

  createItem: async function(userId, game, data) {
    const item = new Sale({
      user: userId,
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