let responses = ""
const adminToUserReducer = (state = responses, action) => {
  if (action.type === 'ACCESS_USER_INFO') {
    return action.payload
  }
  return state;
}



export default adminToUserReducer;
