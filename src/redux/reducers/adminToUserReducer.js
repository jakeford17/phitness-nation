
const adminToUserReducer = (state = [], action) => {
  if (action.type === 'ACCESS_USER_INFO') {
    return action.payload
  }
  return state;
}



export default adminToUserReducer;
