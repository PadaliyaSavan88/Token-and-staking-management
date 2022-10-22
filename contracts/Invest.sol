// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "./Token.sol";

contract Invest is Token {
    // mapping (address => uint256) public investors;
    struct investor {
        uint lendingDate; 
        uint amount;
    }

    mapping(address => investor) public Investors;

    modifier validateInvestor(uint256 _amount) {
        require(msg.sender != address(0), "Zero Address Encountered. Please Invest From Valid Address!!");
        require(_amount > 0, "Please Invest More Than 0 Ether");
        _;
    }

    function investInMPay(uint256 _amount) public validateInvestor(_amount) {
        Investors[msg.sender] = investor(block.timestamp, _amount);
        // if(_amount > 5 ether){
        //     transferTokenToInvestor(msg.sender, (_amount * 1000) + (_amount / 20));
        // } else if (_amount > 1 ether) {
        //     transferTokenToInvestor(msg.sender, (_amount * 1000) + (_amount / 10));
        // } else {
        // }
        transferTokenToInvestor(msg.sender, _amount);
    }
}