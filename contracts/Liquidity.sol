// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;
import "./Token.sol";

contract Liquidity is Token {
    address public liquidityContract = address(this);
    mapping(address => uint256) public liquidityInvestmentBalance;
    mapping(address => uint256) public liquidityTokenBalance;

    modifier checkValidityForLiquidity(address _user, uint256 _tokenAmount, uint256 _investmentAmount) {
        require(_tokenAmount > 0, 'Token amount must be greater than 0');
        require(_investmentAmount > 0, 'INvestment amount must be greater than 0');
        require(_user != address(0)); 
        _;
    }

    function addLiquidity(address _user, uint256 _investmentAmount) internal {
        require(_investmentAmount > 0, 'INvestment amount must be greater than 0');
        require(_user != address(0)); 
        liquidityInvestmentBalance[liquidityContract] = _investmentAmount;
    }

    // Add liquidity to liquidity smart contract
    function addStakingLiquidity(address _user, uint256 _tokenAmount, uint256 _investmentAmount) internal checkValidityForLiquidity(_user, _tokenAmount, _investmentAmount) {
        liquidityInvestmentBalance[liquidityContract] = _investmentAmount;
        liquidityTokenBalance[_user] = _tokenAmount;
    }
}