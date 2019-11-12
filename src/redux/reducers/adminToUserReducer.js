const adminToUserReducer = (state = [], action) => {
    switch (action.type) {
      case 'ACCESS_USER_INFO':
          state = action.payload;
        return state;
      
      default:
        return state;
    }
  };


  export default adminToUserReducer;
  