import React from 'react';

export const ForkedRepos = ({forks, loading}) => {
  const renderForks = () => {
    if (loading) {
      return (
        <div>Loading...</div>
      )
    } else if (!loading && !forks.length) {
      return (
        <div>No results</div>
      )
    } else {
      return (
        <ul>
          {forks.map((fork, i) =>
            <li key={i}>
              <a href={fork.url}>{fork.name}</a>
            </li>
          )}
        </ul>
      )
    }
  };

  return (
    <div>
      <h3>Forked Repos</h3>
      {renderForks()}
    </div>
  )
}
