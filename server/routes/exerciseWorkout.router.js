const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get workouts router, automatically gets the currently logged in users workouts
router.get('/:id', (req, res) => {
    let queryText = `SELECT * FROM "exercise_workouts"
                    JOIN "exercises" on "exercises".id = "exercise_workouts".exercise_id
                    WHERE workout_id = $1`
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('GET EXERCISE WORKOUTS ERROR:', error);
        })
});
//put workouts router, send: { id of exercise workout: int, completed_reps: int, completed_sets: int, completed_weight: int, feedback: int }
router.put('/', (req, res) =>{
    let queryText = `UPDATE "exercise_workouts" 
                    SET "completed_reps" = $1, "completed_sets" = $2, 
                    "completed_weight" = $3, "feedback" = $4, "completed" = 'true'
                     WHERE "id" = $5;`;
    let queryInfo = [req.body.completed_reps, req.body.completed_sets, 
                    req.body.completed_weight, req.body.feedback, req.body.id ]
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(200);
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('UPDATE EXERCISE WORKOUTS ERROR:', error)
        })
})
module.exports = router;