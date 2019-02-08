const initialState = {
  isLoggedIn: false,
  username: '',
  userData: {},
  error: false,
  pullRequestsLoading: false,
  forksLoading: false
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
        userData: {},
        pullRequestsLoading: false,
        forksLoading: false
      }
    case 'ADD_PULL_REQUESTS_LOADING_ACTION':
      return {
        ...state,
        pullRequestsLoading: !state.pullRequestsLoading
      }
    case 'ADD_PULL_REQUESTS_SUCCESS_ACTION':
      return {
        ...state,
        userData: {
          ...state.userData,
          pullRequestEvent: action.pullRequestEvent
        }
      }
    case 'ADD_PULL_REQUESTS_FAIL_ACTION':
      return {
        ...state,
        error: {
          status: true,
          message: action.error
        }
      }
    case 'ADD_FORKS_SUCCESS_ACTION':
      return {
        ...state,
        userData: {
          ...state.userData,
          forks: action.forks
        }
      }
    case 'ADD_FORKS_LOADING_ACTION':
      return {
        ...state,
        forksLoading: !state.forksLoading
      }
    case 'ADD_FORKS_FAIL_ACTION':
      return {
        ...state,
        error: {
          status: true,
          message: action.error
        }
      }
    default:
     return state;
  }
}
