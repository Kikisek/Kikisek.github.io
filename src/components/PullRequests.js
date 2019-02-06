import React from 'react';

const prStyle = {
  open: {color: 'green'},
  closed: {color: 'red'},
  merged: {color: 'purple'},
  default: {color: 'black'}
}

export const PullRequests = ({pullRequests}) => {
  return (
    <div>
      <h3>Pull Requests</h3>
      <em>
        <small style={prStyle.open}>opened</small>
        <small style={{...prStyle.closed, margin: "0 5px"}}>closed</small>
        <small style={prStyle.merged}>merged</small>
      </em>
      {pullRequests.length ?
      <ul>
        {pullRequests.map((pullRequest, i) =>
          <li key={i}>
            <a style={prStyle[pullRequest.state ? pullRequest.state : 'default']} href={pullRequest.url}>{pullRequest.title}</a>
          </li>
        )}
      </ul> :
      <div> - </div>
      }
    </div>
  )
}
