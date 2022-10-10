const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    Santa: {
      type: String,
    },
    UserGifted: {
      type: String,
    },
    Gift: {
      type: String,
    },
    GiftMessage: {
      type: String,
    },
    IsValid: {
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
