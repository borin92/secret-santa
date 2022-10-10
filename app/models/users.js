const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
    FirstName: {
      type: String,
    },
    LastName: {
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
