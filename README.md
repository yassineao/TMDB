# Movierito

A full-stack web application for browsing and managing movies and TV series using The Movie Database (TMDB) API. Built with React for the frontend and Express.js for the backend, featuring user authentication, favorites management, and a responsive design.

## Features

- **Movie & Series Browsing**: Discover popular movies and TV series
- **Genre Exploration**: Browse content by genres
- **Search Functionality**: Search for specific movies and series
- **User Authentication**: Sign up, sign in, and manage user profiles
- **Favorites Management**: Add/remove movies and series to/from favorites
- **Responsive Design**: Optimized for desktop and mobile devices
- **Trailer Viewing**: Watch movie trailers directly in the app
- **Actor Information**: View cast details and photos

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **GSAP** - Animation library
- **React Slick** - Carousel/slider component
- **React YouTube** - YouTube video integration
- **CSS3** - Styling with custom animations

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- TMDB API Key (get one from [TMDB](https://www.themoviedb.org/settings/api))

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TMDB
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create `backend/.env` with:
   ```
   MONGODB_URI=mongodb://localhost:27017/FilmUsers
   JWT_SECRET=replace_with_a_long_random_secret
   FRONTEND_ORIGIN=http://localhost:3000
   PORT=5000
   ```

   Create root `.env` with:
   ```
   REACT_APP_MOVIE_API_KEY=your_tmdb_api_key
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run start:backend
   ```
   The backend will run on http://localhost:5000

2. **Start the frontend**
   ```bash
   npm start
   ```
   The frontend will run on http://localhost:3000

### Production Build

```bash
npm run build
```

## Project Structure

```
TMDB/
├── backend/                 # Express.js backend
│   ├── index.js            # Main server file
│   └── package.json        # Backend dependencies
├── public/                 # Static assets
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/                    # React frontend
│   ├── api/                # API service functions
│   ├── assets/             # Static assets
│   ├── components/         # Reusable React components
│   ├── pages/              # Page components
│   ├── styles/             # CSS stylesheets
│   ├── App.js              # Main App component
│   └── index.js            # React entry point
├── package.json            # Frontend dependencies
└── README.md               # This file
```

## API Endpoints

### Authentication
- `POST /api/signup` - User registration
- `POST /api/signin` - User login
- `GET /api/user` - Get user profile

### Favorites
- `GET /api/favorites` - Get user's favorite movies/series
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:id` - Remove from favorites

### TMDB Integration
- Movies, series, genres, search, and trailer data fetched from TMDB API

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie and TV series data
- [Create React App](https://create-react-app.dev/) for the React boilerplate
- All the open-source libraries used in this project

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)