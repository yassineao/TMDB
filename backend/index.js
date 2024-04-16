const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookies = require('js-cookie');
const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FilmUsers', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

// Define User schema
const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
    unique: true,
    required: true,
  },
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  country: String,
  city: String,
  house_Nr: String,
  pLZ: Number,
  phoneNumber: Number,
  createdAt: {
    type: Date,
    default: Date.now,
    alias: 'created_at', 
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    alias: 'updated_at', 
  },
});

const User = mongoose.model('User', UserSchema);
User.createIndexes();
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send('App is working');
});

// Register route
app.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, password, country, city, house_Nr, pLZ, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstname, lastname, email, password: hashedPassword, country, city, house_Nr, pLZ, phoneNumber });
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ userId: user._id }, 'your_secret_key');
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', user, token });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', userId: req.userId });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
