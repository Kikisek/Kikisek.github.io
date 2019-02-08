import React from 'react';
import { PullRequests } from './PullRequests';
import { ForkedRepos } from './ForkedRepos';

export class UserInfo extends React.Component {
  componentDidMount() {
    this.props.mappedProps.fetchPullRequests(this.props.mappedProps.username);
    this.props.mappedProps.fetchForks(this.props.mappedProps.username);
  }

  render() {
    return ( 
      <div> 
        {this.props.mappedProps.error ?
        <h2>Sorry, something went wrong</h2> :
        <div>
          <h2>Welcome <span style={{color: 'seagreen', fontWeight: 'normal', fontStyle: 'italic'}}>{this.props.mappedProps.username}</span>, here is your recent Github activity:</h2>
          <ForkedRepos forks={this.props.mappedProps.userData.forks || []} />
          <PullRequests pullRequests={this.props.mappedProps.userData.pullRequestEvent || []} />
        </div>}
      </div>
    )
  }
}
