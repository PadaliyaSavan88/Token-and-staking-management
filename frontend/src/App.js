import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Convert from './components/Convert';
import Invest from './components/Invest';
import Records from './components/Records';
import { Component } from 'react';
import Token from '../src/artifacts/Token.json'
const Web3 = require('web3')

class App extends Component  {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    let web3
    // const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
    if (window.ethereum) {
      try {
        web3 = new Web3(window.ethereum)
        // Request account access if needed
        await window.ethereum.enable()
        // Acccounts now exposed
        // web3.eth.sendTransaction({/* ... */})
        const networkId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts()
        const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
        const totalSupply = await token.methods.totalSupply().call();
        const symbol = await token.methods.symbol().call();
        const name = await token.methods.name().call();
        const decimals = await token.methods.decimals().call();
        console.log("name", name)
        console.log("totalSupply", totalSupply)
        console.log("symbol", symbol)
        console.log("decimals", decimals)
        console.log(accounts)
      } catch (error) {
        // User denied account access...
        console.log("ERROR:", error)
      }
    }
  }
  render() {
    return (
      <div className='container mt-4'>
        <Convert></Convert>
        <Invest></Invest>
        <Records></Records>
      </div>
    );
  }
}

export default App;
