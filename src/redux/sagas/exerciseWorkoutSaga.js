import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import connect from './connect';

//fetch exercise workouts. automatically fetches goals for the logged in user
function* fetchExerciseWorkouts(){
    try{
        const response = yield axios.get('/api/exerciseWorkouts')
        yield put ({ type: 'SET_EXERCISE_WORKOUTS', payload: response.data})
    }catch (error) {
        console.log('FETCH EXERCISE WORKOUTS ERROR:', error);
    }
}
//update exercise workouts, send: { id of exercise workout: int, completed_reps: int, completed_sets: int, completed_weight: int, feedback: int }
function* updateExerciseWorkouts(action){
    try{
        yield axios.put('/api/exerciseWorkouts', action.payload)
        yield put ({ type: 'FETCH_EXERCISE_WORKOUTS' })
    }catch (error) {
        console.log('UPDATE EXERCISE WORKOUTS ERROR')
    }
}
//admin post exercise workouts, send: {}
function* postExerciseWorkouts(action){
    try{
        yield axios.post('/api/admin/exerciseWorkouts', action.payload)
        yield put ({ type: 'ADMIN_FETCH_EXERCISE_WORKOUTS', payload: connect.id()})
    }catch (error) {
        console.log('POST EXERCISE WORKOUTS ERROR')
    }
}
//admin fetch exercise workouts, send id of user you want data from
function* adminFetchExerciseWorkouts(action){
    try{
        const response = yield axios.get('/api/admin/exerciseWorkouts' + action.payload)
        yield put ({ type: 'SET_EXERCISE_WORKOUTS', payload: response.data })
    }catch (error) {
        console.log('ADMIN FETCH EXERCISE WORKOUTS ERROR:', error)
    }
}
function* workoutsSaga(){
    yield takeLatest('FETCH_EXERCISE_WORKOUTS', fetchExerciseWorkouts);
    yield takeLatest('UPDATE_EXERCISE_WORKOUTS', updateExerciseWorkouts);
    yield takeLatest('POST_EXERCISE_WORKOUTS', postExerciseWorkouts);
    yield takeLatest('ADMIN_FETCH_EXERCISE_WORKOUTS', adminFetchExerciseWorkouts)
}

export default workoutsSaga;