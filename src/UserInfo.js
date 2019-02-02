import React from 'react';
import {
  mockData as userdata
} from './mockData';

export class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: userdata
    }
  }

  componentDidMount() {
    // fetch(`https://api.github.com/users/${this.props.username}/events`)
    // .then(response => response.json())
    // .then(json => {
    //   this.setState({ userData: json });
    //   console.log(this.state.userData);
    // });
  }


  render() {
    return ( 
      <div> 
        <div>Username: {this.props.username} </div>
        <div>PRs:</div> {parseUserData(this.state.userData, 'PullRequestEvent').map((pr, index) => <div key={index}>{pr.pr.title}</div>)}
      </div>
    )
  }
}

const parseUserData = (data, type) =>
  data
  .filter(event => event.type === type)
  .reduce((acc, current) => {
    return [
      ...acc,
      {
        repo: {
        name: current.repo.name,
        url: current.repo.url
        },
        pr: {
          title: current.payload.pull_request.title,
          url: current.payload.pull_request.url
        }
      }
    ]
  }, [])
