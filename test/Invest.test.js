const { assert } = require('chai');
const { time } = require('@openzeppelin/test-helpers');

require('./helper');
const Invest = artifacts.require('./Invest');
const Token = artifacts.require('./Token');
const Liquidity = artifacts.require('./Liquidity');

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
                assert.equal(result.toString(),totalExpectedToken.toString());
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

    describe('Release investment', () => {

        describe('Withdrawal investment success', () => {
            let invest;
            let liquidity;
            beforeEach(async () => {
                liquidity = await Liquidity.new();
                invest = await Invest.new();
                await invest.investInMPay(ether(2), { from: user2 });
                await time.increase(time.duration. minutes(16)); // change time by increasing to 16 min to cancel investment and stake investment
            })
            it('success investment', async () => {
                let investor = await invest.Investors(user2);
                assert.equal(investor[2].toString(), ether(2).toString())
            })
            it('success withdrawal', async() => {
                await invest.cancelInvestment({from: user2})
                let liquidityAmount = await invest.totalLiquidity()
                assert.equal(liquidityAmount.toString(), (ether(2)*0.10).toString())
            })
            it('success token burn', async() => {
                await invest.cancelInvestment({from: user2})
                assert(invest.balanceOf(user2).toString(), '0')
            })

        })

        describe('Stake Investment success', () => {
            let invest;
            let liquidity;
            beforeEach(async () => {
                liquidity = await Liquidity.new();
                invest = await Invest.new();
                await invest.investInMPay(ether(1), { from: user2 });
                await time.increase(time.duration. minutes(16)); // change time by increasing to 16 min to cancel investment and stake investment
            })
            it('success investment', async () => {
                let investor = await invest.Investors(user2);
                assert.equal(investor[2].toString(), ether(1).toString())
            })
            it('success staking', async() => {
                await invest.stakeInvestment({from: user2})
                let liquidityAmount = await invest.totalLiquidity()
                assert.equal(liquidityAmount.toString(), (ether(1)*0.10).toString())
                let stakedInvestmentAmount = await invest.stackedInvestmentLiquidity(user2)
                assert.equal(stakedInvestmentAmount.toString(), (ether(1)*0.9).toString())
                let stakedTokenBalance = await invest.stackedTokenLiquidity(user2)
                assert.equal(stakedTokenBalance.toString(), ((1000).toString()))
            })
        })

        describe('Withdrawal investment failure for time bound', () => {
            let invest;
            beforeEach(async () => {
                invest = await Invest.new();
                await invest.investInMPay(ether(1), { from: user });
                await time.increase(time.duration. minutes(14));
            })
            it('failure for withdrawal before time', async() => {
                await invest.cancelInvestment().should.be.rejected
            })
            it('failure for staking before time', async() => {
                await invest.stakeInvestment().should.be.rejected
            })
        })
    })
})