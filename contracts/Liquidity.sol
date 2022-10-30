// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract Liquidity {
    address _liquidityContractAddress = address(this);
    struct Liquidities {
        address userAddress;
        uint256 amount;
    }

    modifier checkValidityForLiquidity(address _user, uint256 _amount) {
        require(_amount > 0, 'Amount must be greater than 0');
        require(_user != address(0)); 
        _;
    }

    function addLiquidity(address _user, uint256 _amount) internal pure checkValidityForLiquidity(_user, _amount) {
        Liquidities(_user, _amount);
    }
}