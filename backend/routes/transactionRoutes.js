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

router.delete('/delete/:id', verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const transaction = await Transaction.findById(id)
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }
    if (transaction.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }
    await Transaction.findByIdAndDelete(id)
    res.status(200).json({ message: 'Transaction deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.put('/edit/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  const { description, date, category, type, price } = req.body

  try {
    const transaction = await Transaction.findById(id)

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    if (transaction.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    transaction.description = description
    transaction.date = date
    transaction.category = category
    transaction.type = type
    transaction.price = price

    await transaction.save()
    res.status(200).json({ message: 'Transaction updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get a transaction by ID
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const transaction = await Transaction.findById(id)

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    if (transaction.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    res.status(200).json({
      id: transaction.id,
      description: transaction.description,
      date: transaction.date,
      category: transaction.category,
      type: transaction.type,
      price: transaction.price
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
