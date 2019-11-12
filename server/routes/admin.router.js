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

module.exports = router;
