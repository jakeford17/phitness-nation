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
//Admin PUT request to update workouts for a user, send: {week number: int, id of workout: int }
router.put('/workouts', (req, res) =>{
    const queryText = 'UPDATE "workouts" SET "week" = $1 WHERE "id" = $2;';
    const queryInfo = [req.body.week, req.body.id ]
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(200)
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('ERROR UPDATING ADMIN WORKOUTS:', error)
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
//admin GET request to get complicance for a user, automatically gets the data of the "current user"
router.get('/data/:id', (req, res) =>{
    const queryText = 'SELECT "exercise_workouts".completed, "workouts".week FROM "exercise_workouts" JOIN "workouts" ON "workouts".id = "exercise_workouts".workout_id WHERE "workouts".user_id = $1;';
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send(determineCompliance(result.rows))
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('ERROR GETTING COMPLIANCE DATA:', error)
        })
})
/* function that takes in all the exercise_workouts of a user and spits out an array of weeks that contain info
input: [exercise workout 1, exercise workout 2, exercise workout 3]
output: 

    [
        week1: {
            complete: 3,
            total: 5
        },
        week2: {
            complete: 5,
            total: 10
        }
    ]

*/
function determineCompliance(array){
    let compliance = []
    let maxWeek = 0;
    for(let i = 0; i < array.length; i++){
        if(array[i].week > maxWeek){
            maxWeek = array[i].week
        }
    }
    for(let i = 1; i < maxWeek + 1; i++){
        let completed = 0
        let total = 0
        for(let j = 0; j < array.length; j++){
            if(array[j].week === i){
                total++
                if(array[j].completed){
                    completed++
                }
            }
        }
        compliance.push({week: i, completed: completed, total: total})
    }
    return compliance;
}
module.exports = router;
