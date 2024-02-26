const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

module.exports = {
  createAccount: async function(username, email, password) {
    const user = new User();

    user.username = username;
    user.email = email;
    user.setPassword(password);
  
    const saved = await user.save();
    return { user: saved.toAuthJSON() };
  },

  getUserInfo: async function(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User does not exists');
    }
    return {
      user: user.toAuthJSON()
    }
  },

  changePassword: async function(userId, currentPassword, password) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User does not exists");
    }

    if (!user.validPassword(currentPassword)) {
      throw new Error("No password matches");
    }

    user.setPassword(password);
    await user.save();
  },

  changeUserEmail: async function(userId, email) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User does not exists");
    }

    user.email = email;
    const saved = await user.save();
    return { user: saved.toAuthJSON() };
  },

  changeUserName: async function(userId, username) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User does not exists");
    }

    user.username = username;
    const saved = await user.save();
    return { user: saved.toAuthJSON() };
  },
};