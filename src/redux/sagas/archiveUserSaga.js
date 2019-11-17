import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "REACTIVATE_USER" actions
function* archiveUser(action) {
    try {
        yield axios.put('/api/user/archive', action.payload);
    } catch (error) {
        console.log('error while reactivating user', error)
    }
}

function* reactivateUserSaga() {
    yield takeEvery('ARCHIVE_USER', archiveUser);
}

export default reactivateUserSaga;