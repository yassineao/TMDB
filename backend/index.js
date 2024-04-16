

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
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      house_Nr: {
        type: String,
      },
      pLZ: {
        type: Number,
      
      },
      phoneNumber: {
        type: Number,
        
      },
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
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
