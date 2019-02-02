import React from 'react';
import { UserInfo } from './components/UserInfo';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoggedIn: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(e) {
    this.setState({ isLoggedIn: true });
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  handleClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ?
          <div>
            <UserInfo username={this.state.username} />
            <button onClick={this.handleClick} type="button" class="btn btn-default">Back</button>
          </div> :
          <div>
            <h1>Github fetcher</h1>
            <p class="lead">Give me your Github username and I will show you some magic</p>
            <form onSubmit={this.handleSubmit} class="form-inline">
              <div class="form-group">
                <label for="userNameInput">Github Username:</label>
                <input value={this.state.username} onChange={this.handleChange} required class="form-control" id="userNameInput" style={{margin: "30px 10px"}} />
              </div>
              <button type="submit" class="btn btn-primary" disabled={!this.state.username}>Submit</button>
            </form>
          </div>
        }
      </div>
    );
  }
}

export default App;
