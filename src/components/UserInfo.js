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
          fetch(pr.apiUrl)
            .then(response => response.json())
            .then(json => {
              const state = json.merged ? 'merged' : json.state;
              return {...pr, state: state}
            })
            .catch(err => {console.log('Err'); console.log(err)})
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
        const parsedForks = parseForks(json);
        let promises = parsedForks.map(fork =>
          fetch(fork.url)
            .then(response => response.json())
            .then(json => ({...fork, url: json.parent.html_url}))
        )

        return Promise.all(promises)
          .then(value => {
            this.setState({userData : {
              ...this.state.userData,
              forks: value
            }})
          })
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
    .filter(event => event.type === type && event.payload.action === "opened")
    .map(event => (
      {
        title: event.payload.pull_request.title,
        apiUrl: event.payload.pull_request.url,
        url: event.payload.pull_request.html_url
      }
    ));

const parseForks = (data) =>
  data
    .filter(value => value.fork)
    .map(value => (
      {
        name: value.name,
        url: value.url
      }
    ));
