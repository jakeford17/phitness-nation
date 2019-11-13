import { combineReducers } from 'redux';


const exerciseWorkoutReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EXERCISE_WORKOUTS':
            return action.payload;
        default:
            return state;
    }
};
const complianceReducer = (state = [], action) =>{
    switch(action.type) {
        case 'SET_COMPLIANCE':
            return action.payload
        default:
            return state;
    }
}


export default combineReducers({
    exerciseWorkoutReducer,
    complianceReducer,
});