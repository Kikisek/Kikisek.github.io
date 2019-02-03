import React from 'react';
import { connect } from 'react-redux';
import { UserInfo } from './components/UserInfo';
import { loginAction } from'./actions/loginAction';
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
    this.props.loginAction();
    this.setState({ isLoggedIn: true });
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  handleClick() {
    this.setState({
      isLoggedIn: false,
      username: ''
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ?
          <div>
            <UserInfo username={this.state.username} />
            <button onClick={this.handleClick} type="button" className="btn btn-default">Back</button>
          </div> :
          <div>
            <h1>Github fetcher</h1>
            <p className="lead">Give me your Github username and I will show you some magic</p>
            <form onSubmit={this.handleSubmit} className="form-inline">
              <div className="form-group">
                <label htmlFor="userNameInput">Github Username:</label>
                <input value={this.state.username} onChange={this.handleChange} required className="form-control" id="userNameInput" style={{margin: "30px 10px"}} />
              </div>
              <button type="submit" className="btn btn-primary" disabled={!this.state.username}>Submit</button>
            </form>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: () => dispatch(loginAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
