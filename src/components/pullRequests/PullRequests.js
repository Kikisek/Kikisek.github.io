import React from 'react';

export class PullRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.pullRequests;
  }

  componentDidMount() {
    // const newState =
    // this.state.map(pr => {
    //   // debugger
    //   return fetch(pr.pr.url)
    //   .then(response => response.json())
    //   .then(json => {
    //     console.log(addPrState(pr, json.state))
    //     return addPrState(pr, json.state)
    //   })
      
    // })

    // this.setState(newState);
    
    // console.log(this.state)

    // console.log( this.state.map(pr => addPrState(pr, 'open')))
  }

  render() {
    return (
      <div>
        <h3>Pull Requests</h3>
        <ul>
          {/* {this.state.map((pullRequest, i) =>
            <li key={i}>
              <a href={pullRequest.pr.url}>{pullRequest.pr.title}</a>
            </li>
          )} */}
        </ul>
      </div>
    )
  }
}

const addPrState = (data, state) => {
  // debugger
  return (
  {
    ...data,
    pr: {
      ...data.pr,
      state
    }
  }
)
}
