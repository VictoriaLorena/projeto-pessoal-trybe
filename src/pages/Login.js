import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLogin } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    const { loginEmail, history } = this.props;

    const MAXLENGTH = 6;

    const verification = (
      email.includes('@') && email.includes('.com')
      && password.length >= MAXLENGTH
    );

    return (
      <div>
        Login
        <form
          onSubmit={ (e) => {
            e.preventDefault();
          } }
        >
          <input
            data-testid="email-input"
            name="email"
            type="email"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            data-testid="password-input"
            name="password"
            type="password"
            onChange={ this.handleChange }
            value={ password }
          />
          <button
            type="submit"
            id="button"
            disabled={ !verification }
            onClick={ () => {
              loginEmail(email);
              history.push('/carteira');
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginEmail: (email) => dispatch(getLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);
