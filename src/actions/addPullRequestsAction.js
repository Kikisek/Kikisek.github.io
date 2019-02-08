export const addPullRequestsSuccessAction = (data) => {
  return {
   type: 'ADD_PULL_REQUESTS_ACTION',
   pullRequestEvent: data
  }
}

export const fetchPullRequests = (username) => {
  return (dispatch, getState) => {
    fetch(`https://api.github.com/users/${username}/events`)
    .then(response => response.json())
    .then(json => {
      const parsedData = parseEvents(json, 'PullRequestEvent');
      let promises = parsedData.map(pr =>
        fetch(pr.apiUrl)
          .then(response => response.json())
          .then(json => {
            const state = json.merged ? 'merged' : json.state;
            return {...pr, state: state}
          })
      )
    
      return Promise.all(promises)
      .then(value => {
        dispatch(addPullRequestsSuccessAction(value));
      })
    })
    // .catch((err) => this.setState({error: {status: true, message: err}}));
  }
}

const parseEvents = (data, type) =>
data
  .filter(event => event.type === type && event.payload.action === "opened")
  .map(event => (
    {
      title: event.payload.pull_request.title,
      apiUrl: event.payload.pull_request.url,
      url: event.payload.pull_request.html_url
    }
  ));
