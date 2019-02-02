import React from 'react';

export class PullRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.pullRequests
    }
  }

  componentDidMount() {
    let promises = this.state.data.map(pr =>
      fetch(pr.pr.url)
      .then(response => response.json())
      .then(json => addPrState(pr, json.state))
    )

    Promise.all(promises)
    .then(value => this.setState({data: value}))



    // console.log( this.state.map(pr => addPrState(pr, 'open')))
  }

  render() {
    return (
      <div>
        <h3>Pull Requests</h3>
        <ul>
          {this.state.data.map((pullRequest, i) =>
            <li key={i}>
              <a href={pullRequest.pr.url}>{pullRequest.pr.title}</a>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const addPrState = (data, state) => (
  {
    ...data,
    pr: {
      ...data.pr,
      state
    }
  }
)
