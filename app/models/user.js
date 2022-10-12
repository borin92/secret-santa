const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    }
  },
  {
    collection: "users",
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
