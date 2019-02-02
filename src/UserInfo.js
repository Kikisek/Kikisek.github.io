import React from 'react';
import { PullRequests } from './PullRequests';
import { ForkedRepos } from './ForkedRepos'
import { mockData as userdata } from './mockData';

export class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: parseUserData(userdata, 'ForkEvent', 'PullRequestEvent')
      // userData: {}
    }
  }

  componentDidMount() {
    // fetch(`https://api.github.com/users/${this.props.username}/events`)
    // .then(response => response.json())
    // .then(json => {
    //   this.setState({ userData: parseUserData(json, 'PullRequestEvent', 'ForkEvent') });
    //   console.log(this.state.userData);
    // });
  }

  render() {
    return ( 
      <div> 
        <h2>Welcome <span style={{color: 'seagreen', fontWeight: 'normal', fontStyle: 'italic'}}>{this.props.username}</span>, here is your recent Github activity:</h2>
        <ForkedRepos forks={this.state.userData.ForkEvent} />
        <PullRequests pullRequests={this.state.userData.PullRequestEvent} />
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
