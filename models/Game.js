const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9_]+$/, "is invalid"],
      index: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "can't be blank"],
    },
  },
  { timestamps: true }
);

GameSchema.methods.toJSON = function(){
  return {
    code: this.code,
    title: this.title,
  };
};

mongoose.model('Game', GameSchema);
