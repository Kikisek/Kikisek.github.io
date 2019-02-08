import React from 'react';

const prStyle = {
  open: {color: 'green'},
  closed: {color: 'red'},
  merged: {color: 'purple'},
  default: {color: 'black', pointerEvents: 'none', cursor: 'default', textDecoration: 'none'}
}

export const PullRequests = ({pullRequests, loading}) => {
  const renderPullRequests = () => {
    if (loading) {
      return (
        <div>Loading...</div>
      )
    } else if (!loading && !pullRequests.length) {
      return (
        <div>No results</div>
      )
    } else {
      return (
        <ul>
          {pullRequests.map((pullRequest, i) =>
            <li key={i}>
              <a style={prStyle[pullRequest.state ? pullRequest.state : 'default']} href={pullRequest.url}>{pullRequest.title}</a>
            </li>
          )}
        </ul>
      )
    }
  }

  return (
    <div>
      <h3>Pull Requests</h3>
      <em>
        <small style={prStyle.open}>opened</small>
        <small style={{...prStyle.closed, margin: "0 5px"}}>closed</small>
        <small style={prStyle.merged}>merged</small>
        <small style={{...prStyle.default, margin: "0 5px"}}>no info</small>
      </em>
      {renderPullRequests()}
    </div>
  )
}
