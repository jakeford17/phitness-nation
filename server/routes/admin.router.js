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
router.get('/exercise/:active', (req, res) => {
    const active = req.params.active;
    const queryText = `SELECT * FROM "exercises" WHERE "active" = $1;`;
    pool.query(queryText, [active]).then((response) => {
        res.send(response.rows)
    }).catch((err) => {
        console.log('Error ---------> GETTING list of Exercises', err);
        res.sendStatus(500);
    });
})

//GET request to display exercise Details
router.get('/exerciseDetail/:id', (req, res) => {
    const exerciseId = req.params.id
    const queryText = `SELECT * FROM "exercises" WHERE "id" = $1;`;
    pool.query(queryText, [exerciseId]).then((response) => {
        res.send(response.rows[0])
    }).catch((err) => {
        console.log('Error ---------> GETTING Exercise Detail', err);
        res.sendStatus(500);
    });
})

//PUT request to update specific exercise detail changes
router.put('/exerciseDetail/:id', (req, res) => {
    const exerciseId = req.params.id
    const exercise = req.body
    const queryValues = [
        exercise.name,
        exercise.default_sets,
        exercise.default_reps,
        exercise.default_weight,
        exercise.links,
        exercise.units,
        exerciseId
    ]
    const queryText = `UPDATE "exercises" SET ("name", "default_sets", "default_reps", "default_weight", "links", "units") = ($1, $2, $3, $4, $5, $6) WHERE "id" = $7;`;
    pool.query(queryText, queryValues)
    .then(() => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log('Error ---------> updating exercise from library', err);
        res.sendStatus(500);
    });
});

//PUT REQUEST for ADMIN to archive exercises
router.put('/exerciseArchive/:id', (req, res) => {
    const exerciseId = req.params.id;
    const active = false;
    const queryText = `UPDATE "exercises" SET "active" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [active, exerciseId])
    .then(() => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log('Error ---------> archive exercise ', err);
        res.sendStatus(500);
    });
});


//DELETE exercise from Admin's library in database
router.delete('/exerciseDetail/:id', (req, res) => {
    const exerciseId = req.params.id
    const queryText = `DELETE FROM "exercises" WHERE "id" = $1;`;
    //console.log(`getting id: ${id} and req.body: ${points}`);
    pool.query(queryText, [exerciseId])
    .then(() => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log('Error ---------> deleting exercises from library', err);
        res.sendStatus(500);
    });
});

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
//Admin POST request to post workouts for a user, send: { user_id: int, week: int }
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
//admin GET request to get exercise workouts for a user send user id as a URL param
router.get('/exerciseWorkouts/:id', (req, res) =>{
    const queryText = `SELECT "exercise_workouts".* FROM "exercise_workouts" JOIN "workouts" ON "exercise_workouts".workout_id = "workouts".id WHERE "workouts".user_id = $1;`
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send((result.rows))
        }).catch((error) =>{
            console.log('ERROR GETTING LIST OF EXERCISE WORKOUTS FOR A USER:', error);
            res.sendStatus(500);
        })
})
//admin POST request to add exercise workouts for a user, send: { workout_id: int, exercise_id: int, assigned_sets: int, assigned_reps: int, assigned_weight: int, tips: "String" }
router.post('/exerciseWorkouts', (req, res) =>{
    const queryText = 'INSERT INTO "exercise_workouts" ("workout_id", "exercise_id", "assigned_sets", "assigned_reps", "assigned_weight", "tips") VALUES ( $1, $2, $3, $4, $5, $6);';
    const queryInfo = [ req.body.workout_id, req.body.exercise_id, req.body.assigned_sets, req.body.assigned_reps, req.body.assigned_weight, req.body.tips ]
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(201)
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('ERROR POSTING EXERCISE WORKOUTS:', error)
        })
})
//admin PUT request to exercise workouts for a user, send: { id: int, assigned_sets: int, assigned_reps: int, assigned_weight: int, tips: "String" }
router.put('/exerciseWorkouts', (req, res) =>{
    const queryText = 'UPDATE "exercise_workouts" SET "assigned_sets" = $1, "assigned_reps" = $2, "assigned_weight" = $3, "tips" = $4 WHERE "id" = $5;';
    const queryInfo = [ req.body.assigned_sets, req.body.assigned_reps, req.body.assigned_weight, req.body.tips, req.body.id ]
    pool.query(queryText, queryInfo) 
        .then(() =>{
            res.sendStatus(200)
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('ERROR UPDATING ADMIN EXERCISE WORKOUTS:', error)
        })
})
//admin DELETE request to exervise workouts for a user, send the id of the exercise workout that you want to delete
router.delete('/exerciseWorkouts/:id', (req, res) =>{
    const queryText = 'DELETE FROM "exercise_workouts" WHERE "id" = $1;';
    pool.query(queryText, [req.params.id])
        .then(() =>{
            res.sendStatus(200)
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('ERROR DELETEING EXERCISE WORKOUTS:', error)
        })
})




module.exports = router;
