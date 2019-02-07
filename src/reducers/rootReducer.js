const initialState = {
  isLoggedIn: false,
  username: ''
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return {
       ...state,
       isLoggedIn: true
      }
    case 'SUBMIT_USERNAME_ACTION':
      return {
        ...state,
        username: action.username
      }
    case 'LOGOUT_ACTION':
      return {
        ...state,
        isLoggedIn: false,
        username: ''
      }
    default:
     return state;
  }
}
