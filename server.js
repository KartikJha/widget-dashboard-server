import express from 'express'
import http from 'http'
import * as socketIo from 'socket.io'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import widgetRoutes from './routes/widgetRoutes.js'
import authRoutes from './routes/authRoutes.js'

import { authenticateJWT } from './middlewares/authMiddleware.js'
import initSocketServer from './middlewares/socketMiddleware.js'


// import socketService from './services/socketService.js'

dotenv.config()

// Start server
const PORT = process.env.PORT || 5000

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err))

// Initialize express app and HTTP server
const app = express()
const server = http.createServer(app)

// Set up WebSocket server
const wsServer = new socketIo.Server(server, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
  },
//   allowRequest: checkWSAuth,
})

initSocketServer(wsServer)
// Middlewares
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/widgets', authenticateJWT, widgetRoutes)
app.use('/api/auth', authRoutes)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
