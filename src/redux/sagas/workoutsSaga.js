import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import connect from './connect';

//fetch goals. automatically fetches goals for the logged in user
function* fetchWorkouts(){
    try{
        const response = yield axios.get('/api/workouts')
        yield put ({ type: 'SET_WORKOUTS', payload: response.data})
    }catch (error) {
        console.log('FETCH GOALS ERROR:', error);
    }
}
//user update workouts send: { workout id: int, feedback: int }
function* updateWorkouts(action){
    try{
        yield axios.put('/api/workouts', action.payload)
        if(connect.admin()){
            yield put ({ type: 'ADMIN_FETCH_WORKOUTS', payload: connect.id() })
        }
        yield put ({ type: 'FETCH_WORKOUTS' })
    }catch (error) {
        console.log('FETCH GOALS ERROR:', error);
    }
}
//admin post workouts send: { user id: int, week: int }
function* postWorkouts(action){
    try{
        yield axios.post('/api/admin/workouts', action.payload)
        yield put ({ type: 'ADMIN_FETCH_WORKOUTS', payload: connect.id() })
    }catch (error) {
        console.log('POST WORKOUTS ERROR', error);
    }
}
//admin get workouts saga send the id of the user you want workouts for
function* adminGetWorkouts(action){
    try{
        const response = yield axios.get('/api/admin/workouts/' + action.payload)
        yield put ({ type: 'SET_WORKOUTS', payload: response.data})
    }catch (error){
        console.log('ADMIN GET WORKOUTS ERROR:', error)
    }
}
function* workoutsSaga(){
    yield takeLatest('FETCH_WORKOUTS', fetchWorkouts);
    yield takeLatest('UPDATE_WORKOUTS', updateWorkouts);
    yield takeLatest('POST_WORKOUTS', postWorkouts);
    yield takeLatest('ADMIN_FETCH_WORKOUTS', adminGetWorkouts);
}

export default workoutsSaga;