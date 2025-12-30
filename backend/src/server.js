// const express = require('express') // default is this which is type of commonjs
import express from 'express' // changed type to module in package.json to allow this to work
import dotenv from 'dotenv'
import path from 'path'

import {connectDB} from './lib/db.js'

import authRoutes from './routes/auth.route.js'
import messagesRoutes from './routes/message.route.js'
import { connect } from 'http2'

dotenv.config()
const app = express()
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000

app.use(express.json()) // req.body

app.use("/api/auth", authRoutes)
app.use("/api/messages", messagesRoutes)

// Make ready for deployment
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
})
}

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`)
    connectDB()
})