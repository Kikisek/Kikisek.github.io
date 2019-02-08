const addForksSuccessAction = data => (
  {
   type: 'ADD_FORKS_SUCCESS_ACTION',
   forks: data
  }
)

const addForksFailAction = data => (
  {
    type: 'ADD_FORKS_FAIL_ACTION',
    error: data
  }
)

const addForksLoadingAction = () => (
  {
    type: 'ADD_FORKS_LOADING_ACTION'
  }
)

export const fetchForks = username =>
  dispatch => {
    dispatch(addForksLoadingAction());
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(json => {
        const parsedForks = parseForks(json);
        let promises = parsedForks.map(fork =>
          fetch(fork.url)
            .then(response => response.json())
            .then(json => ({...fork, url: json.parent.html_url}))
        )

        return Promise.all(promises)
          .then(value => {
            dispatch(addForksSuccessAction(value))
            dispatch(addForksLoadingAction());
          });
      })
      .catch(err => {
        dispatch(addForksFailAction(err));
        dispatch(addForksLoadingAction());
      });
  }

const parseForks = data =>
  data
    .filter(value => value.fork)
    .map(value => (
      {
        name: value.name,
        url: value.url
      }
    ));
