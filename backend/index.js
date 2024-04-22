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
  favoriteFilms: {
    type: [Number], // Array of integers
    default: [],
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
        const token = jwt.sign({ user: user }, '65269dfa629841gwe9r51er8');
      
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
  const token =  req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, '65269dfa629841gwe9r51er8', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded.user;
    next();
  });
};
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Modify Profile route
app.put('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { firstname, lastname, email, country, city, house_Nr, pLZ, phoneNumber } = req.body;
    console.log(userId,userId.lastname,"wwwww",lastname)
    // Construct update object with provided fields
    const updateFields = {};
    if (firstname) updateFields.firstname = firstname;
    if (lastname) updateFields.lastname = lastname;
    if (email) updateFields.email = email;
    if (country) updateFields.country = country;
    if (city) updateFields.city = city;
    if (house_Nr) updateFields.house_Nr = house_Nr;
    if (pLZ) updateFields.pLZ = pLZ;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    // Check if the provided email already exists in the database
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    console.log(updateFields,userId,updateFields.lastname,"wwwww",lastname)
    // Find the user by ID and update the profile fields
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    const token = jwt.sign({ user: updatedUser }, '65269dfa629841gwe9r51er8');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: updatedUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

app.put('/add-favorite-film', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { filmId, type } = req.body;
    // Find the user by ID and update favoriteFilms array based on the type
    let updatedUser;
    if (type === 'addToSet') {
      
    console.log('Remove from favosssssssrites:', type,filmId);
      updatedUser = await User.findByIdAndUpdate(userId, {
        $addToSet: { favoriteFilms: filmId } // $addToSet ensures filmId is added only if not already present
      }, { new: true }); // To return the updated document
    } else {
      updatedUser = await User.findByIdAndUpdate(userId, {
        $pull: { favoriteFilms: filmId } // $pull removes filmId from favoriteFilms array
      }, { new: true }); // To return the updated document
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});
app.get('/favorite-movies', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('favoriteFilms');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user.favoriteFilms);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});