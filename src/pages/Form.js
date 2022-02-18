import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import fetchApi from '../services/FETCHAPI';
import { getCoins } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      coins: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.apiRequest();
  }

  apiRequest = async () => {
    const coins = await fetchApi();
    this.setState({
      coins: Object.keys(coins).filter((coin) => coin !== 'USDT'),
    });
  }

  handleClick = async () => {
    const { addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;

    addExpense({
      value,
      description,
      currency,
      method,
      tag,
    });
    this.setState({ value: '', description: '' });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, expenses } = this.props;
    const { value, description, currency, method, tag, coins } = this.state;

    const total = expenses.reduce(
      (acc, expense) => acc + parseFloat(expense.value)
        * parseFloat(expense.exchangeRates[expense.currency].ask),
      0,
    );

    return (
      <div>
        <main className="Header">
          <p data-testid="email-field">{ email }</p>

          <p data-testid="total-field">{ total }</p>

          <p data-testid="header-currency-field">BRL</p>

        </main>
        <form>
          <label htmlFor="value">
            Valor da despesa:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              id="value"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição da despesa:
            <input
              type="text"
              name="description"
              value={ description }
              id="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              value={ currency }
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {coins.map((coin) => (
                <option key={ coin } data-testid={ coin } value={ coin }>{coin}</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              value={ method }
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            <select
              name="tag"
              value={ tag }
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>

            </select>
          </label>

          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>

        </form>
      </div>
    );
  }
}

Form.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  addExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (payload) => dispatch(getCoins(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
