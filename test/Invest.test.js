const { expect } = require('chai');

require('./helper');
const Invest = artifacts.require('./Invest');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Invest', ([deployer,user, receiver, exchange]) => {
    let invest;

    // beforeEach(async () => {
    //     invest = await Invest.new();
    // })

    describe('invest', () => {
        describe('success', async () => {
            it('success investment', async () => {
                invest = await Invest.new();
                await invest.investInMPay(ether(1), { from: user })
                let investor = await invest.Investors(user);
                // investor[0].amount.toString().to.equal(ether(1).toString())
                assert.equal(investor[1].toString(), ether(1).toString()) // invest[1] is to access variable at 2nd position in struct Investors
            })
        })

        describe('failure', () => {
            it('failure for 0 account', async () => {
                invest = await Invest.new();
                await invest.investInMPay(ether(1), {from: 0x0}).should.be.rejected;
            })

            it('failure for zero amount', async () => {
                invest = await Invest.new();
                await invest.investInMPay(ether(0), {from: user}).should.be.rejected;
            })
        })
    })
})