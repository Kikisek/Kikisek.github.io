import React from 'react';

const prStyle = {
  open: {color: 'green'},
  closed: {color: 'red'},
  merged: {color: 'purple'}
}

export const PullRequests = ({pullRequests}) => {
  return (
    <div>
      <h3>Pull Requests</h3>
      <div>
        <span style={prStyle.open}>opened</span>
        <span style={prStyle.closed}>closed</span>
        <span style={prStyle.merged}>merged</span>
      </div>
      <ul>
        {pullRequests.map((pullRequest, i) =>
          <li key={i}>
            <a style={prStyle[pullRequest.pr.state]} href={pullRequest.pr.url}>{pullRequest.pr.title}</a>
          </li>
        )}
      </ul>
    </div>
  )
}
