const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
        res.status(200).json({ message: 'Login successful', user });
        console.log("1")
      } else {
        res.status(401).json({ message: 'Invalid password' });
        console.log("2")
        console.log(password)
        console.log(user.password)
      }
    } else {
      res.status(404).json({ message: 'User not found' });
      console.log("3")
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
    console.log("4")
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
