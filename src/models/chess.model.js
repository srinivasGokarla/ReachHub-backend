const mongoose = require('mongoose');

const chessSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true },
    perfs: {
      classical: {
        rating: { type: Number, required: true },
        progress: { type: Number, required: true },
      },
    },
    patron: { type: Boolean, default: false },
  });
  
  const Chess = mongoose.model('chessDB', chessSchema);

  module.exports = Chess;