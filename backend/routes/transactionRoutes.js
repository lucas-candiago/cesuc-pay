const express = require('express')
const Transaction = require('../models/Transaction')
const verifyToken = require('../middlewares/authMiddlewares')

const router = express.Router()

// Rota protegida
router.post('/add', verifyToken, async (req, res) => {
  const { description, date, category, type, price } = req.body

  try {
    const newTransaction = new Transaction({
      description,
      date,
      category,
      type,
      price,
      user: req.userId // userId vem do middleware de autenticação
    })

    await newTransaction.save()

    res.status(201).json({ message: 'Transaction created successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// list all users endpoint
router.get('/all', verifyToken, async (req, res) => {
  try {
    const transactionObjects = await Transaction.find().sort({ date: -1 })

    const transactions = []

    transactionObjects.map(transaction => {
      if (transaction.user == req.userId) {
        transactions.push({
          id: transaction.id,
          description: transaction.description,
          date: transaction.date,
          category: transaction.category,
          type: transaction.type,
          price: transaction.price
        })
      }
    })

    res.status(200).json({ transactions })
  } catch (error) {
    res.status(404).json({ message: 'Server error' })
  }
})

module.exports = router
