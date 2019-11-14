import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "REACTIVATE_USER" actions
function* reactivateUser(action) {
    try {
        yield axios.put('/api/user/reactivate', action.payload);
    } catch (error) {
        console.log('error while reactivating user', error)
    }
}

function* reactivateUserSaga() {
    yield takeEvery('REACTIVATE_USER', reactivateUser);
}

export default reactivateUserSaga;