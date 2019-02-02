import React from 'react';
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
        <div>Username: {this.props.username} </div>
        <div>PRs:</div> {this.state.userData.PullRequestEvent.map((pr, index) => <div key={index}>{pr.pr.title}</div>)}
        <div>Forks:</div> {this.state.userData.ForkEvent.map((fork, index) => <div key={index}>{fork.repo.name}</div>)}
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
