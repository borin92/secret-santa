const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    santa: {
      type: String,
    },
    userGifted: {
      type: String,
    },
    gift: {
      type: String,
    },
    giftMessage: {
      type: String,
    },
    isValid: {
      type: String,
    }
  },
  {
    collection: "gift",
    minimize: false,
    versionKey: false,
    autoIndex: true
  }).set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    }
  });

module.exports = Schema;
