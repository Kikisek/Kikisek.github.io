import React from 'react';
import { PullRequests } from './PullRequests';
import { ForkedRepos } from './ForkedRepos';

export class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      error: false
    }
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.props.username}/events`)
      .then(response => response.json())
      .then(json => {
        const parsedData = parseEvents(json, 'PullRequestEvent');
        let promises = parsedData.map(pr =>
          fetch(pr.url)
          .then(response => response.json())
          .then(json => {
            const state = json.merged ? 'merged' : json.state;
            return {...pr, state}
          })
        )
      
        return Promise.all(promises)
        .then(value => {
          this.setState({ userData: {
            ...this.state.userData,
            pullRequestEvent: value
          }})
        })
      })
      .catch((err) => this.setState({error: {status: true, message: err}}));

    fetch(`https://api.github.com/users/${this.props.username}/repos`)
      .then(response => response.json())
      .then(json => {
        this.setState({userData : {
          ...this.state.userData,
          forks: parseForks(json)
        }})
      })
      .catch((err) => this.setState({error: {status: true, message: err}}));
  }

  render() {
    return ( 
      <div> 
        {this.state.error ?
        <h2>Sorry, something went wrong</h2> :
        <div>
          <h2>Welcome <span style={{color: 'seagreen', fontWeight: 'normal', fontStyle: 'italic'}}>{this.props.username}</span>, here is your recent Github activity:</h2>
          <ForkedRepos forks={this.state.userData.forks || []} />
          <PullRequests pullRequests={this.state.userData.pullRequestEvent || []} />
        </div>}
      </div>
    )
  }
}

const parseEvents = (data, type) =>
  data
    .filter(event => event.type === type)
    .map(event => (
      {
        title: event.payload.pull_request.title,
        url: event.payload.pull_request.url
      }
    ));

const parseForks = (data) =>
  data
    .filter(value => value.fork)
    .map(value => (
      {
        name: value.name,
        url: value.html_url
      }
    ));
