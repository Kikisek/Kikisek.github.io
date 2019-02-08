const initialState = {
  isLoggedIn: false,
  username: '',
  userData: {},
  error: false
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
        username: '',
        userData: {}
      }
    case 'ADD_PULL_REQUESTS_ACTION':
      return {
        ...state,
        userData: {
          ...state.userData,
          pullRequestEvent: action.pullRequestEvent
        }
      }
    default:
     return state;
  }
}
