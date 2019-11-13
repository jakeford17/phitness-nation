import { store } from '../../index';

const connect = {
    id: function getStore(){
        return parseInt(store.getState().adminToUserReducer.adminToUserReducer)
    },
    admin: function getAdmin(){
        return store.getState().user.admin
    }
}

export default connect;