const Invest = artifacts.require("Invest");
const Liquidity = artifacts.require("Liquidity");
const Token = artifacts.require("Token");
require('web3')

module.exports = async function (deployer) {
  const accounts = await web3.eth.getAccounts();

  
  const feeAccount = accounts[0]
  const feePercent = 10
  
  await deployer.deploy(Token);
  await deployer.deploy(Invest);
  await deployer.deploy(Liquidity);
};
