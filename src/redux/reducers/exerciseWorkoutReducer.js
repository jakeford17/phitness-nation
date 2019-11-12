import { combineReducers } from 'redux';


const exerciseWorkoutReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EXERCISE_WORKOUTS':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    exerciseWorkoutReducer,
});