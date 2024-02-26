const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    },
    options: {
    }
  },
  { timestamps: true }
);

ItemSchema.methods.toJSON = function(){
  return {
    id: this._id,
    name: this.name,
    options: this.options
  };
};

mongoose.model('Item', ItemSchema);
