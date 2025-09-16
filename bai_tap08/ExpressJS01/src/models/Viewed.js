const mongoose = require('mongoose');

const viewedSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // optional (guest)
  sessionId: { type: String, required: false }, // nếu dùng session
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  viewedAt: { type: Date, default: Date.now }
});

viewedSchema.index({ user: 1, product: 1, viewedAt: -1 });

const Viewed = mongoose.model('Viewed', viewedSchema);
module.exports = Viewed;
