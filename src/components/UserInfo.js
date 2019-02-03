import React from 'react';
import { PullRequests } from './PullRequests';
import { ForkedRepos } from './ForkedRepos';

// MOCK DATA:
// When mocking Github API response, uncomment these comments & comment out componentDidMount()

// import { mockData as userdata } from '../mockData';

// const parseMockData = (data) => {
//   const parsedData = parseUserData(data, 'ForkEvent', 'PullRequestEvent');
//   return (
//     {
//       ...parsedData,
//       pullRequestEvent: parsedData.pullRequestEvent.map(pr => addPrState(pr, 'open'))
//     }
//   )
// }

export class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // MOCK DATA:
      // userData: parseMockData(userdata),
      userData: {},
      error: false
    }
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.props.username}/events`)
    .then(response => response.json())
    .then(json => {
      const parsedData = parseUserData(json, 'PullRequestEvent', 'ForkEvent');
      let promises = parsedData.pullRequestEvent.map(pr =>
        fetch(pr.pr.url)
        .then(response => response.json())
        .then(json => {
          const state = json.merged ? 'merged' : json.state;
          return addPrState(pr, state)
        })
      )
  
      Promise.all(promises)
      .then(value => {
        this.setState({ userData: {
          ...parsedData,
          pullRequestEvent: value
        }})
      })
    })
    .catch((err) => this.setState({error: {status: true, message: err}}))
  }

  render() {
    return ( 
      <div> 
        {this.state.error ?
        <h2>Sorry, something went wrong</h2> :
        <div>
          <h2>Welcome <span style={{color: 'seagreen', fontWeight: 'normal', fontStyle: 'italic'}}>{this.props.username}</span>, here is your recent Github activity:</h2>
          <ForkedRepos forks={this.state.userData.forkEvent || []} />
          <PullRequests pullRequests={this.state.userData.pullRequestEvent || []} />
        </div>}
      </div>
    )
  }
}

const parseUserData = (data, ...type) =>
  type
  .reduce((accumulator, currentType) => {
    return {
      ...accumulator,
      [removeCapitalization(currentType)]: [
        ...data
        .filter(event => event.type === currentType)
        .reduce((acc, current) => [
            ...acc,
            {
              repo: {
              name: current.repo.name,
              url: current.repo.url
              },
              ...(current.type === 'PullRequestEvent' && {
                pr: {
                  title: current.payload.pull_request.title,
                  url: current.payload.pull_request.url
                }
              })
            }
          ], [])
      ]
    }
  }, {}
)

const addPrState = (data, state) => (
  {
    ...data,
    pr: {
      ...data.pr,
      state
    }
  }
)

const removeCapitalization = str => str.charAt(0).toLowerCase() + str.slice(1);
