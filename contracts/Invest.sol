// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.16;

contract Invest {
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
    }
}