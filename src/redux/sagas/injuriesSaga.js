import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//fetch injuries. automatically fetches goals for the logged in user
function* fetchInjuries(){
    try{
        const response = yield axios.get('/api/injury')
        yield put ({ type: 'SET_INJURIES', payload: response.data})
    }catch (error) {
        console.log('FETCH INJURIES ERROR:', error);
    }
}
//post injury saga, send: { user_id: int, type: "String", description: "String", severity: int }
function* postInjury(action){
    try{
        yield axios.post('/api/injury', action.payload)
        yield put ({ type: 'FETCH_INJURIES'})
    }catch (error) {
        console.log('POST INJURIES ERROR:', error);
    }
}
//update goal saga, send: { user_id: int, type: "String", description: "String", severity: int }
function* updateInjury(action){
    try{
        axios.put('/api/injury', action.payload)
        yield put ({ type: 'FETCH_INJURIES'})
    }catch (error) {
        console.log('PUT INJURIES ERROR:', error);
    }
}
//delete goal saga, send the id of the goal
function* deleteInjury(action){
    try{
        axios.delete('/api/injury/' + action.payload)
        yield put ({ type: 'FETCH_INJURIES'})
    }catch (error) {
        console.log('DELETE INJURIES ERROR:', error);
    }
}

function* injuriesSaga() {
    yield takeLatest('FETCH_INJURIES', fetchInjuries);
    yield takeLatest('POST_INJURY', postInjury);
    yield takeLatest('UPDATE_INJURY', updateInjury);
    yield takeLatest('DELETE_INJURY', deleteInjury)
}

export default injuriesSaga;