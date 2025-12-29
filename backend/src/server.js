// const express = require('express') // default is this which is type of commonjs
import express from 'express' // changed type to module in package.json to allow this to work
import dotenv from 'dotenv'

import authRoutes from './routes/auth.route.js'
import messagesRoutes from './routes/message.route.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use("/api/auth", authRoutes)
app.use("/api/messages", messagesRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`)
})