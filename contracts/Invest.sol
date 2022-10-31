// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "./Token.sol";
import "./Liquidity.sol";

contract Invest is Token, Liquidity {
    // mapping (address => uint256) public investors;
    struct investor {
        uint lendingDate; 
        uint duration;
        uint amount;
    }

    mapping(address => investor) public Investors;
    address investmentContract = address(this);

    modifier validateInvestor(uint256 _amount) {
        require(msg.sender != address(0), "Zero Address Encountered. Please Invest From Valid Address!!");
        require(_amount > 0, "Please Invest More Than 0 Ether");
        _;
    }

    modifier checkTimestamp() {
        require(Investors[msg.sender].amount == 0, "only stake holder can operate stake");
        require(Investors[msg.sender].duration < block.timestamp, "staking duration is not completed yet");
        _;
    }

    function investInMPay(uint256 _amount) public validateInvestor(_amount) {
        Investors[msg.sender] = investor(block.timestamp, block.timestamp + 15 minutes, _amount);
        if(_amount > 5 ether){
            transferTokenToInvestor(msg.sender, (_amount * 1000) + ((_amount / 20) * 1000));
        } else if (_amount > 1 ether) {
            transferTokenToInvestor(msg.sender, (_amount * 1000) + ((_amount / 10) * 1000));
        } else {
            transferTokenToInvestor(msg.sender, _amount * 1000);
        }
    }

    function cancelInvestment() public checkTimestamp {
        uint256 investmentAmount = (Investors[msg.sender].amount*90)/100;
        transfer(msg.sender,investmentAmount);
        uint256 stakeAmount = (Investors[msg.sender].amount - investmentAmount);
        addLiquidity(liquidityContract, stakeAmount);
        burnToken(msg.sender, balanceOf[msg.sender]);
        Investors[msg.sender] = investor(0,0,0);
    }

    function stakeInvestment() public checkTimestamp {
        uint256 tokenAmount = balanceOf[msg.sender];
        uint256 investmentAmount = Investors[msg.sender].amount;
        addStakingLiquidity(msg.sender, tokenAmount, investmentAmount);
    }


}