const mongoose = require('mongoose');
const Game = mongoose.model('Game');

module.exports = {
  createGame: async function(code, title) {
    const game = new Game({ code, title });
    const saved = await game.save();
    return { game: saved };
  },

  getGames: async function() {
    const games = await Game.find({});
    return { games }
  },

  updateGame: async function(game, code, title) {
    game.code = code;
    game.title = title;
    const saved = await game.save();
    return { game: saved };
  },

  deleteGame: async function(game) {
    return {
      game: await game.remove()
    }
  },
};