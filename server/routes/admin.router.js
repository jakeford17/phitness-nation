const express = require('express');
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
// const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

//Admin GET request to grab list of user from database to display on dashboard
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "user";`;
    pool.query(queryText).then((response) => {
        res.send(response.rows)
    }).catch((err) => {
        console.log('Error ---------> GETTING list of Users', err);
        res.sendStatus(500);
    });
})

//Admin GET request to grab exercise list from databbase to display on dashboard
router.get('/exercise', (req, res) => {
    const queryText = `SELECT * FROM "exercises";`;
    pool.query(queryText).then((response) => {
        res.send(response.rows)
    }).catch((err) => {
        console.log('Error ---------> GETTING list of Exercises', err);
        res.sendStatus(500);
    });
})

//Admin POST request to add new exercise to list in database
router.post('/addExercise', (req, res) => {
    const exercise = req.body;
    const queryValue = [
        exercise.exerciseName,
        exercise.set,
        exercise.frequency,
        exercise.weight,
        exercise.link,
        exercise.units,
    ]
    const queryText = `INSERT INTO "exercises" ("name", "default_sets", "default_reps", "default_weight", "links", "units") VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, queryValue).then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log('Error adding exercis to list', err);
        res.sendStatus(500);
    });
})

//Admin GET request to get goals for a specific user
router.get('/goals/:id', (req, res) =>{
    const queryText = `SELECT * FROM "goals" WHERE "user_id" = $1;`
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send((result.rows))
        }).catch((error) =>{
            console.log('ERROR GETTING LIST OF GOALS FOR A USER:', error);
            res.sendStatus(500);
        })
})
//Admin GET request to get injuries for a specific user
router.get('/injuries/:id', (req, res) =>{
    const queryText = `SELECT * FROM "injuries" WHERE "user_id" = $1;`
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send((result.rows))
        }).catch((error) =>{
            console.log('ERROR GETTING LIST OF INJURIES FOR A USER:', error);
            res.sendStatus(500);
        })
})
//Admin POST request to post workouts for a user
router.post('/workouts', (req, res) =>{
    const queryText = 'INSERT INTO "workouts" ("user_id", "week") VALUES ( $1, $2 );';
    const queryInfo = [ req.body.id, req.body.week ]
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(201);
        }).catch((error) =>{
            res.sendStatus(500)
        })
})
//Admin GET request to get workouts for a user
router.get('/workouts/:id', (req, res) =>{
    const queryText = `SELECT * FROM "workouts" WHERE "user_id" = $1;`
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send((result.rows))
        }).catch((error) =>{
            console.log('ERROR GETTING LIST OF WORKOUTS FOR A USER:', error);
            res.sendStatus(500);
        })
})
//admin GET request to get exercise workouts for a user
router.get('/exerciseWorkouts/:id', (req, res) =>{
    const queryText = `SELECT * FROM "exercise_workouts" WHERE "user_id" = $1;`
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send((result.rows))
        }).catch((error) =>{
            console.log('ERROR GETTING LIST OF EXERCISE WORKOUTS FOR A USER:', error);
            res.sendStatus(500);
        })
})
module.exports = router;
