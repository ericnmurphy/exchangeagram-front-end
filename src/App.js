import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Header from './components/Header';
import Home from './views/Home';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';

class App extends Component {
  state = {
    isLoggedIn: false,
    user: {},
  }

  componentDidMount = () => {
    if (localStorage.getItem('egt') === null) {
      this.setState({
        isLoggedIn: false,
      });
      this.props.history.push('/'); //this is how to redirect to signin page
    } else {
      const decoded = jwt_decode(localStorage.getItem('egt'))
      this.setState({
        isLoggedIn: true,
        user: decoded,
      })
    }
  }

  setUser = (userData) => {
    this.setState({
      user: userData,
      isLoggedIn: true,
    });
  }

  handleLogout = () => {
    console.log('logout clicked')
    if (localStorage.getItem('egt') !== null) {
      localStorage.removeItem('egt');
      this.setState({ isLoggedIn: false, user: {} });
      this.props.history.push('/');
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="MainLayout__root">
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        <Switch>
          <Route exact path="/" render={props => <SignIn {...props} setUser={this.setUser} />} />
          <Route exact path="/signup" render={props => <SignUp {...props} setUser={this.setUser} />} />
          <Route path="/home" render={props => <Home user={this.state.user} handleLogout={this.handleLogout} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);




