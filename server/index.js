const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;

// Load environment variables
require('dotenv').config();

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Models (Database models should be defined here, for example, using Sequelize, Knex, etc.)
// These are placeholders for your models (Movie, Review, User)
const Movie = require('./models/Movie');
const Review = require('./models/Review');
const User = require('./models/User');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport strategies
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findByGoogleId(profile.id);
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            google_id: profile.id,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: '/auth/microsoft/callback',
      scope: ['user.read'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findByMicrosoftId(profile.id);
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            microsoft_id: profile.id,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// API Routes

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.getAllMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new movie
app.post('/api/movies', async (req, res) => {
  try {
    const newMovie = await Movie.createMovie(req.body);
    res.json(newMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reviews by movie ID
app.get('/api/reviews/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await Review.getReviewsByMovieId(movieId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a review
app.post('/api/reviews', async (req, res) => {
  try {
    const newReview = await Review.createReview(req.body);
    res.json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Authentication routes
// Google OAuth login
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/'); // Redirect to your app after successful login
});

// Microsoft OAuth login
app.get('/auth/microsoft', passport.authenticate('microsoft'));

// Microsoft OAuth callback
app.get('/auth/microsoft/callback', passport.authenticate('microsoft', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/'); // Redirect to your app after successful login
});

// User login (local authentication)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);
    if (user && user.password === password) {
      req.session.user = user;
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get currently logged-in user
app.get('/api/auth/user', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// User registration (local)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await User.createUser(username, password, email);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User logout
app.get('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Logout successful' });
  });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
