require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

// Routes
app.use("/users", require("./routes/authRoutes"))
app.use("/transactions", require("./routes/transactionRoutes"))

const PORT = 8000
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));