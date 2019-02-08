import React from 'react';
import { PullRequests } from './PullRequests';
import { ForkedRepos } from './ForkedRepos';

export class UserInfo extends React.Component {
  componentDidMount() {
    this.props.mappedProps.fetchPullRequests(this.props.mappedProps.username);

    // fetch(`https://api.github.com/users/${this.props.username}/repos`)
    //   .then(response => response.json())
    //   .then(json => {
    //     const parsedForks = parseForks(json);
    //     let promises = parsedForks.map(fork =>
    //       fetch(fork.url)
    //         .then(response => response.json())
    //         .then(json => ({...fork, url: json.parent.html_url}))
    //     )

    //     return Promise.all(promises)
    //       .then(value => {
    //         this.setState({userData : {
    //           ...this.state.userData,
    //           forks: value
    //         }})
    //       })
    //   })
    //   .catch((err) => this.setState({error: {status: true, message: err}}));
  }

  render() {
    return ( 
      <div> 
        {this.props.mappedProps.error ?
        <h2>Sorry, something went wrong</h2> :
        <div>
          <h2>Welcome <span style={{color: 'seagreen', fontWeight: 'normal', fontStyle: 'italic'}}>{this.props.mappedProps.username}</span>, here is your recent Github activity:</h2>
          {/* <ForkedRepos forks={this.state.userData.forks || []} /> */}
          <PullRequests pullRequests={this.props.mappedProps.userData.pullRequestEvent || []} />
        </div>}
      </div>
    )
  }
}

const parseForks = (data) =>
  data
    .filter(value => value.fork)
    .map(value => (
      {
        name: value.name,
        url: value.url
      }
    ));
