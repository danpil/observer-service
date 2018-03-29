import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      chatId: '',
      message: '',
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { chatId } = this.state;

    axios
      .post('/api/auth/login', { chatId })
      .then(result => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: '' });
        this.props.history.push('/');
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.setState({ message: 'Login failed. Your ID not match' });
        }
      });
  };

  render() {
    const { chatId, message } = this.state;
    return (
      <div class="container">
        <form class="form-signin" onSubmit={this.onSubmit}>
          {message !== '' && (
            <div class="alert alert-warning alert-dismissible" role="alert">
              {message}
            </div>
          )}
          <h2 class="form-signin-heading">Please sign in</h2>
          <label for="chatId" class="sr-only">
            Your ID
          </label>
          <input
            type="text"
            class="form-control"
            placeholder="Your ID"
            name="chatId"
            value={chatId}
            onChange={this.onChange}
            required
          />
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
