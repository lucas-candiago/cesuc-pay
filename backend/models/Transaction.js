const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: Date, required: true, unique: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: String, required: true },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
})

module.exports = mongoose.model('Transaction', TransactionSchema)
