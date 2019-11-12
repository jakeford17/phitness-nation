
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
<<<<<<< HEAD
=======
const adminRouter = require ('./routes/admin.router');

>>>>>>> 32087a0b4f62f420d08249ab23b2da842a2635d6
const goalsRouter = require('./routes/goals.router');
const injuriesRouter = require('./routes/injuries.router');
const workoutsRouter = require('./routes/workouts.router');
const exerciseWorkoutRouter = require('./routes/exerciseWorkout.router');
<<<<<<< HEAD
=======

>>>>>>> 32087a0b4f62f420d08249ab23b2da842a2635d6

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
<<<<<<< HEAD
=======
app.use('/api/admin', adminRouter);

>>>>>>> 32087a0b4f62f420d08249ab23b2da842a2635d6
app.use('/api/goals', goalsRouter);
app.use('/api/injury', injuriesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/exerciseWorkouts', exerciseWorkoutRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
