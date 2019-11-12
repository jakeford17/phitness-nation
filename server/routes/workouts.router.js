const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get workouts router, automatically gets the currently logged in users workouts
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "workouts" WHERE user_id = $1`
    pool.query(queryText, [req.user.id])
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('GET WORKOUTS ERROR:', error);
        })
});

module.exports = router;