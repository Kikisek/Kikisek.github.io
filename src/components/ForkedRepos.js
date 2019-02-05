import React from 'react';

export const ForkedRepos = ({forks}) => {
  return (
    <div>
      <h3>Forked Repos</h3>
      {forks.length ?
      <ul>
        {forks.map((fork, i) =>
          <li key={i}>
            <a href={fork.url}>{fork.name}</a>
          </li>
        )}
      </ul> :
      <div> - </div>
      }
    </div>
  )
}
