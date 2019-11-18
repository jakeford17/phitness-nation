import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import connect from './connect';


function* fetchExerciseLibrary(action){
    try{
       const response = yield axios.get(`/api/user/exercise/${action.payload}`)
        yield put ({ type: 'USER_EXERCISE_LIST', payload: response.data})
    }catch (error) {
        console.log('FETCH USER EXERCISE LIBRARY ERROR:', error)
    }
}

function* userExerciseSaga(){
    yield takeLatest('FETCH_USER_EXERCISE_LIST', fetchExerciseLibrary)
}

export default userExerciseSaga;
