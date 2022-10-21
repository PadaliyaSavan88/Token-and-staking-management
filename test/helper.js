module.exports = EVM_REVERT = 'VM Exception while processing transaction: revert'
module.exports = ether = (n) => {
    return new web3.utils.BN(
        web3.utils.toWei(n.toString(), 'ether')
    )
}

module.exports = tokens = (n) => ether(n)