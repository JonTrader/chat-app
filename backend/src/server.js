// const express = require('express') // default is this which is type of commonjs
import express from 'express' // changed type to module in package.json to allow this to work
import cookieParser from 'cookie-parser'
import { ENV } from './lib/env.js'
import path from 'path'
import cors from 'cors'

import { connectDB } from './lib/db.js'

import authRoutes from './routes/auth.route.js'
import messagesRoutes from './routes/message.route.js'
// import { connect } from 'http2'

const app = express()
const __dirname = path.resolve();
const PORT = ENV.PORT || 3000

app.use(express.json({ limit: '5mb' })) // req.body - without the limit of 5mb there was a payload to heavy error that for some reason also triggered a cors error
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true}))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messagesRoutes)

// Make ready for deployment
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/ in ${ENV.NODE_ENV}`)
    connectDB()
})