import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({ username, password: hashedPassword })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error registering user', error: err.message })
  }
}

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )

    res.status(200).json({ token })
  } catch (err) {
    res.status(400).json({ message: 'Error logging in', error: err.message })
  }
}

export function checkWSAuth(req, decisionCallback) {
    const token = req.handshake.auth.token;
  
    console.log(`WS TOKEN ${token}`)
  
    if (!token) {
      throw new Error(`Invalid token received ${token}`);
    } else {
      return new Promise((resolve, reject) => {
          jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
              if (err) {
                  reject(err)
              } else {
                  resolve(user)
              }
              // req.user = user // Attach user info to request
          })
      })
      
    }
  }