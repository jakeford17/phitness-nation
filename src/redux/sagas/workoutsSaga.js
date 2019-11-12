import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//fetch goals. automatically fetches goals for the logged in user
function* fetchWorkouts(){
    try{
        const response = yield axios.get('/api/workouts')
        yield put ({ type: 'SET_WORKOUTS', payload: response.data})
    }catch (error) {
        console.log('FETCH GOALS ERROR:', error);
    }
}


function* workoutsSaga(){
    yield takeLatest('FETCH_WORKOUTS', fetchWorkouts);
}

export default workoutsSaga;