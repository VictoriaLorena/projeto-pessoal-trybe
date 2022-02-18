import React from 'react';
import Table from '../Component/table';
import Form from './Form';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Form />
        <Table />
      </div>
    );
  }
}

export default Wallet;
