import React from 'react';

export const ForkedRepos = ({forks}) => {
  return (
    <div>
      <h3>Forked Repos</h3>
      <ul>
        {forks.map((fork, i) =>
          <li key={i}>
            <a href={fork.repo.url}>{fork.repo.name}</a>
          </li>
        )}
      </ul>
    </div>
  )
}
