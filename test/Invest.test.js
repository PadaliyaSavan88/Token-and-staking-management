const { expect, assert } = require('chai');

require('./helper');
const Invest = artifacts.require('./Invest');
const Token = artifacts.require('./Token');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Invest', ([deployer,user, user2]) => {
    let invest;

    beforeEach(async () => {
        invest = await Invest.new();
    })

    describe('invest', () => {
        let token;
        beforeEach(async() => {
            token = await Token.new()
        })
        describe('success', async () => {
            it('success investment', async () => {
                invest = await Invest.new();
                await invest.investInMPay(ether(1), { from: user })
                let investor = await invest.Investors(user);
                assert.equal(investor[2].toString(), ether(1).toString()) // invest[1] is to access variable at 2nd position in struct Investors
                // let result = await token.balanceOf(user)
                // result.toString().should.equal(tokens(1000).toString())
            })



            it('test token transfer', async () => {
                let tokenAmount = 1;
                let totalExpectedToken = tokenAmount * 1000;
                invest = await Invest.new();
                await invest.investInMPay(ether(tokenAmount), { from: user })
                let result = await invest.balanceOf(user)
                if(tokenAmount > 5){
                    totalExpectedToken = tokenAmount * 1000 + ((tokenAmount/20) * 1000)
                } else if(tokenAmount > 1){
                    totalExpectedToken = tokenAmount * 1000 + ((tokenAmount/10) * 1000)
                }
                assert.equal(result.toString(),tokens(totalExpectedToken).toString());
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