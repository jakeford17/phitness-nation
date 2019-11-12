import { store } from '../../index';

const connect = {
    id: function getStore(){
        return store.getState().user.id
    },
    admin: function getAdmin(){
        return store.getState().user.admin
    }
}

export default connect;