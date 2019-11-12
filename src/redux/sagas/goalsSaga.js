import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//fetch goals. automatically fetches goals for the logged in user
function* fetchGoals(){
    try{
        const response = yield axios.get('/api/goals')
        yield put ({ type: 'SET_GOALS', payload: response.data})
    }catch (error) {
        console.log('FETCH GOALS ERROR:', error);
    }
}
//post goal saga, send: { user_id: int, type: "String", description: "String" }
function* postGoals(action){
    try{
        yield axios.post('/api/goals', action.payload)
        yield put ({ type: 'FETCH_GOALS'})
    }catch (error) {
        console.log('POST GOALS ERROR:', error);
    }
}
//update goal saga, send: { user_id: int, type: "String", description: "String" }
function* updateGoals(action){
    try{
        axios.put('/api/goals', action.payload)
        yield put ({ type: 'FETCH_GOALS'})
    }catch (error) {
        console.log('PUT GOALS ERROR:', error);
    }
}
//delete goal saga, send the id of the goal as the payload
function* deleteGoals(action){
    try{
        axios.delete('/api/goals/' + action.payload)
        yield put ({ type: 'FETCH_GOALS'})
    }catch (error) {
        console.log('DELETE GOALS ERROR:', error);
    }
}
function* goalsSaga() {
    yield takeLatest('FETCH_GOALS', fetchGoals);
    yield takeLatest('POST_GOAL', postGoals);
    yield takeLatest('UPDATE_GOAL', updateGoals);
    yield takeLatest('DELETE_GOAL', deleteGoals)
}


export default goalsSaga;