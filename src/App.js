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
            <button onClick={this.handleClick} type="button">Back</button>
          </div> :
          <form onSubmit={this.handleSubmit}>
          <label>Github Username:
            <input value={this.state.username} onChange={this.handleChange} required/>
          </label>
          <button type="submit">Submit</button>
        </form>
        }
      </div>
    );
  }
}

export default App;
