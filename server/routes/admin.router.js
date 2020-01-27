const express = require('express');
// const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
// const userStrategy = require('../strategies/user.strategy');
const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer')
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//Admin GET request to grab list of user from database to display on dashboard
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "user";`;
    pool.query(queryText).then((response) => {
        res.send(response.rows)
    }).catch((err) => {
        console.log('Error ---------> GETTING list of all Users', err);
        res.sendStatus(500);
    });
})
//Admin GET request to grab SELECTED user from database to display on dashboard

router.get('/user/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    const queryText = `SELECT * FROM "user" WHERE  "id" = $1;`;
    pool.query(queryText, [id]).then((response) => {
        res.send(response.rows[0])
    }).catch((err) => {
        console.log('Error ---------> GETTING list of Users', err);
        res.sendStatus(500);
    });
})
//Admin GET request to grab exercise list from databbase to display on dashboard
router.get('/exercise/:active', rejectUnauthenticated, (req, res) => {
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
router.get('/exerciseDetail/:id', rejectUnauthenticated, (req, res) => {
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
router.put('/exerciseDetail/:id', rejectUnauthenticated, (req, res) => {
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
router.put('/exerciseArchive/:id', rejectUnauthenticated, (req, res) => {
    const exerciseId = req.params.id;
    const active = req.body.active;
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
router.delete('/exerciseDetail/:id', rejectUnauthenticated, (req, res) => {
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
router.post('/addExercise',  rejectUnauthenticated, (req, res) => {
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
router.get('/goals/:id', rejectUnauthenticated, (req, res) =>{
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
router.get('/injuries/:id', rejectUnauthenticated, (req, res) =>{
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
router.post('/workouts', rejectUnauthenticated, (req, res) =>{
    const queryText = 'INSERT INTO "workouts" ("user_id", "week") VALUES ( $1, $2 );';
    const queryInfo = [ req.body.user_id, req.body.week ]
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(201);
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('POST WORKOUTS ERROR:', error)
        })
})
//Admin GET request to get workouts for a user send the user_id in the URL
router.get('/workouts/:id', rejectUnauthenticated, (req, res) =>{
    const queryText = `SELECT * FROM "workouts" WHERE "user_id" = $1 ORDER BY "workouts".week DESC;`
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send((result.rows))
        }).catch((error) =>{
            console.log('ERROR GETTING LIST OF WORKOUTS FOR A USER:', error);
            res.sendStatus(500);
        })
})
//admin GET request to get the id of the workout that was just created with the post request, send{ user_id: int, week: int }
router.get('/workouts/exerciseWorkouts/:id', rejectUnauthenticated, (req, res) =>{
    const queryInfo = req.params.id.split('-')
    const queryText = 'SELECT "workouts".id FROM "workouts" WHERE "user_id" = $1 AND "week" = $2;';
    pool.query(queryText, [queryInfo[0], queryInfo[1]])
        .then((result) =>{
            console.log(result.rows)
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('ERROR GETTING WORKOUT ID:', error )
        })
})
//Admin PUT request to update workouts for a user, send: {week number: int, id of workout: int }
router.put('/workouts', rejectUnauthenticated, (req, res) =>{
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

//Admin POST request to add exercise workouts for a user, send: { workout_id: int, exercise_id: int, assigned_sets: int, assigned_reps: int, assigned_weight: int, tips: "String" }
router.post('/exerciseWorkouts', rejectUnauthenticated, (req, res) =>{
    const queryText = 'INSERT INTO "exercise_workouts" ("workout_id", "exercise_id", "assigned_sets", "assigned_reps", "assigned_weight", "tips", "order") VALUES ( $1, $2, $3, $4, $5, $6, $7);';
    const queryInfo = [ req.body.workout_id, req.body.exercise.exercise_id, req.body.exercise.assigned_sets, req.body.exercise.assigned_reps, req.body.exercise.assigned_weight, req.body.exercise.tips, req.body.order ]
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(201)
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('ERROR POSTING EXERCISE WORKOUTS:', error)
        })
})
//Admin POST request to add exercise workouts for a user, send: { workout_id: int, exercise_id: int, assigned_sets: int, assigned_reps: int, assigned_weight: int, tips: "String" }
router.post('/newExerciseWorkouts', rejectUnauthenticated, (req, res) =>{
    const queryText = 'INSERT INTO "exercise_workouts" ("workout_id", "exercise_id", "assigned_sets", "assigned_reps", "assigned_weight", "tips", "order") VALUES ( $1, $2, $3, $4, $5, $6, $7);';
    const queryInfo = [ req.body.workout_id, req.body.exercise_id, req.body.assigned_sets, req.body.assigned_reps, req.body.assigned_weight, req.body.tips, req.body.order ]
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(201)
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('ERROR POSTING EXERCISE WORKOUTS:', error)
        })
})
//Admin PUT request to exercise workouts for a user, send: { id: int, assigned_sets: int, assigned_reps: int, assigned_weight: int, tips: "String" }
router.put('/exerciseWorkouts', rejectUnauthenticated, (req, res) =>{
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
router.delete('/exerciseWorkouts/:id', rejectUnauthenticated, (req, res) =>{
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
router.get('/data/:id',  rejectUnauthenticated,(req, res) =>{
    const queryText = 'SELECT "exercise_workouts".completed, "workouts".week FROM "exercise_workouts" JOIN "workouts" ON "workouts".id = "exercise_workouts".workout_id WHERE "workouts".user_id = $1;';
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send(determineCompliance(result.rows))
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('ERROR GETTING COMPLIANCE DATA:', error)
        })
})

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
        let incomplete = 0
        for(let j = 0; j < array.length; j++){
            if(array[j].week === i){
                total++
                if(array[j].completed){
                    completed++
                }
                else {
                    incomplete++
                }
            }
        }
        compliance.push({week: i, completed: completed, total: total, incomplete: incomplete})
    }
    return compliance;
}

router.get('/weeks/:id', rejectUnauthenticated, (req, res) =>{
    const queryText = 'SELECT "workouts".week FROM "workouts" JOIN "user" ON "workouts".user_id = "user".id WHERE "user".id = $1 ORDER BY "workouts".week;';
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            res.sendStatus(500)
            console.log('ERROR GETTING WEEKS DATA:', error)
        })
})
router.get('/email/:id', rejectUnauthenticated, (req, res) =>{
    const queryText = 'SELECT * FROM "user" WHERE "id" = $1;';
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            let to = result.rows[0]
            if(to.email_option){
                emailSender(to).catch(console.error)
            }else{
                console.log('opted out')
            }
            res.sendStatus(200)
        }).catch((error)=>{
            console.log('SEND EMAIL ERROR:', error)
            res.sendStatus(500)
        })
})
async function emailSender(user) {


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let info = await transporter.sendMail({
        from: '"Phitness Nation" <phitnessnationemailbot@gmail.com>', 
        to: `<${user.email}>`,
        subject: 'You have a new Workout from Phil!', 
        text: `Hello, ${user.name}, check your Phitness Nation app to see your latest workout!`, 
        html: `<img src="data:image/jpeg;base64,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"`
    })

    console.log('Message sent: %s', info.messageId)

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

}

router.get('/exercises/:id', rejectUnauthenticated, (req, res) =>{
    const queryText = 'SELECT "exercise_workouts".*, "exercises".name FROM "exercise_workouts" JOIN "exercises" ON "exercise_workouts".exercise_id = "exercises".id WHERE "workout_id" = $1;';
    pool.query(queryText, [req.params.id])
        .then((result) =>{
            res.send(result.rows)
        }).catch((error) =>{
            console.log('GET EXERCISES FOR ONE WOKROUT ERROR:', error)
        })
})

//Admin edit user: update user profile send: { id: int, name: "String", pronouns: "String", phone: "String", email: "String", emergency contact name: "String", emergency contact phone: "String", age/DOB: "String"}
router.put('/edituser', rejectUnauthenticated, (req, res) =>{
    let queryText = `UPDATE "user" SET "name" = $1, "pronouns" = $2, "phone" = $3, "email" = $4, "emergency_contact_name" = $5, "emergency_contact_phone" = $6, "age" = $7 WHERE "id" = $8;`
    let queryInfo = [req.body.name, req.body.pronouns, req.body.phone, req.body.email, req.body.emergencyContactName, req.body.emergencyContactPhone, req.body.dateOfBirth, req.body.id ];
    pool.query(queryText, queryInfo)
        .then(() =>{
            res.sendStatus(200);
        }).catch((error) =>{
            res.sendStatus(500);
            console.log('PUT USER INFO ERROR:', error);
        })
  })
module.exports = router;
