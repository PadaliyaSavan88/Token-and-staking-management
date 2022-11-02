import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Convert from './components/Convert';
import Invest from './components/Invest';
import Records from './components/Records';
import { useState } from 'react';
const Web3 = require('web3')

function App() {
  // Modern DApp Browsers
  let [accounts, setState] = useState
  let web3;
  async function componentWillMount() {
    console.log('function')
    if (typeof window.ethereum !== undefined) {
      window.ethereum.send('eth_requestAccounts');
      let web3 = new Web3(window.ethereum);

      await web3.eth.getAccounts().then(accounts => setState({ accounts }))
      // this.accounts = result;
      let contract = new web3.eth.Contract(this.state.ABI, this.state.Address)
      console.log(accounts)
      console.log(contract.methods.totalSupply())
    }
  }
  componentWillMount()
  return (
    <div className='container mt-4'>
      <Convert></Convert>
      <Invest></Invest>
      <Records></Records>
    </div>
  );
}

export default App;
