const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "can't be blank"],
    },
    content: {
      type: String,
      required: [true, "can't be blank"],
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

SaleSchema.methods.toJSON = function(){
  return {
    id: this._id,
    title: this.title,
    content: this.content
  };
};

mongoose.model('Sale', SaleSchema);
