// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;
import "./Token.sol";

contract Liquidity is Token {
    address public liquidityContract = address(this);
    mapping(address => uint256) public liquidityInvestmentBalance;
    mapping(address => uint256) public stakedInvestmentBalance;
    mapping(address => uint256) public stakedTokenBalance;

    event LiquidityAdded(uint256 _balance, uint256 _amount, address _contractAddress);

    modifier checkValidityForLiquidity(address _user, uint256 _tokenAmount, uint256 _investmentAmount) {
        require(_tokenAmount > 0, 'Token amount must be greater than 0');
        require(_investmentAmount > 0, 'INvestment amount must be greater than 0');
        require(_user != address(0)); 
        _;
    }

    function totalLiquidity() public view returns(uint256) {
        return liquidityInvestmentBalance[address(this)];
    }

    function stackedInvestmentLiquidity(address _user) public view returns(uint256) {
        return stakedInvestmentBalance[_user];
    }

    function stackedTokenLiquidity(address _user) public view returns(uint256) {
        return stakedTokenBalance[_user];
    }

    function addLiquidity(uint256 _investmentAmount) internal {
        require(_investmentAmount > 0, 'INvestment amount must be greater than 0');
        liquidityInvestmentBalance[address(this)] += _investmentAmount;
        emit LiquidityAdded(liquidityInvestmentBalance[address(this)], _investmentAmount, address(this));
    }

    // Add liquidity to liquidity smart contract
    function addStakingLiquidity(address _user, uint256 _tokenAmount, uint256 _investmentAmount) internal checkValidityForLiquidity(_user, _tokenAmount, _investmentAmount) {
        stakedInvestmentBalance[_user] += _investmentAmount;
        stakedTokenBalance[_user] += _tokenAmount;
    }
}