import React from 'react';
import { PullRequests } from './PullRequests';
import { ForkedRepos } from './ForkedRepos'
import { mockData as userdata } from '../mockData';

const parseMockData = (data) => {
  const parsedData = parseUserData(data, 'ForkEvent', 'PullRequestEvent');
  return (
    {
      ...parsedData,
      PullRequestEvent: parsedData.PullRequestEvent.map(pr => addPrState(pr, 'open'))
    }
  )
}

export class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: parseMockData(userdata),
      // userData: {},
      error: false
    }
  }

  componentDidMount() {
    // fetch(`https://api.github.com/users/${this.props.username}/events`)
    // .then(response => response.json())
    // .then(json => {
    //   const parsedData = parseUserData(json, 'PullRequestEvent', 'ForkEvent');
    //   let promises = parsedData.PullRequestEvent.map(pr =>
    //     fetch(pr.pr.url)
    //     .then(response => response.json())
    //     .then(json => {
    //       const state = json.merged ? 'merged' : json.state;
    //       return addPrState(pr, state)
    //     })
    //   )
  
    //   Promise.all(promises)
    //   .then(value => {
    //     this.setState({ userData: {
    //       ...parsedData,
    //       PullRequestEvent: value
    //     }})
    //   })
    // })
    // .catch((err) => this.setState({error: {status: true, message: err}}))
  }

  render() {
    return ( 
      <div> 
        {this.state.error ?
        <h2>Sorry, something went wrong</h2> :
        <div>
          <h2>Welcome <span style={{color: 'seagreen', fontWeight: 'normal', fontStyle: 'italic'}}>{this.props.username}</span>, here is your recent Github activity:</h2>
          <ForkedRepos forks={this.state.userData.ForkEvent || []} />
          <PullRequests pullRequests={this.state.userData.PullRequestEvent || []} />
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
      [currentType]: [
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
