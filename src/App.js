import React from 'react';
import { connect } from 'react-redux';
import { UserInfo } from './components/UserInfo';
import { loginAction } from './actions/loginAction';
import { logoutAction } from './actions/lougoutAction';
import { submitUsernameAction } from './actions/submitUsernameAction';
import { fetchPullRequests } from './actions/addPullRequestsAction';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleSubmit = (e) => {
    this.props.loginAction();
  }

  updateUsername = (e) => {
    this.props.submitUsernameAction(e.target.value);
  }

  logout = () => {
    this.props.logoutAction();
  }

  render() {
    return (
      <div className="App">
        {this.props.isLoggedIn ?
          <div>
            <UserInfo mappedProps={this.props}/>
            <button onClick={this.logout} type="button" className="btn btn-default">Back</button>
          </div> :
          <div>
            <h1>Github fetcher</h1>
            <p className="lead">Give me your Github username and I will show you some magic</p>
            <form onSubmit={this.handleSubmit} className="form-inline">
              <div className="form-group">
                <label htmlFor="userNameInput">Github Username:</label>
                <input value={this.props.username} onChange={this.updateUsername} required className="form-control" id="userNameInput" style={{margin: "30px 10px"}} />
              </div>
              <button type="submit" className="btn btn-primary" disabled={!this.props.username}>Submit</button>
            </form>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  loginAction: () => dispatch(loginAction()),
  submitUsernameAction: (username) => dispatch(submitUsernameAction(username)),
  logoutAction: () => dispatch(logoutAction()),
  fetchPullRequests: (username) => dispatch(fetchPullRequests(username)),
  
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
