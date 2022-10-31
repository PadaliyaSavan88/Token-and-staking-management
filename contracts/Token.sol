// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

contract Token {

    // Variables
    string public name = "Mindpay Token";
    string public symbol = "MINDPAY";
    uint256 public decimals = 18;
    uint256 public totalSupply;
    address public owner;

    //Event
    event Transfer(address indexed from, address indexed to, uint256 _value, uint256 balance);
    event Approval(address indexed owner, address indexed spender, uint256 value);  
    event Burn(address from, uint256 _amount);

    //Track Balance
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        owner = msg.sender;
        totalSupply = 1000000 * (10 ** decimals);
        balanceOf[owner] = totalSupply;
    }

    function transferTokenToInvestor(address _to, uint256 _value) public returns (bool success) {
       require(balanceOf[owner] >= _value);
        _transfer(owner, _to, _value);
        return true; 
    }

    // Transfer
    function transfer (address _to, uint256 _value) public returns (bool success){
        require(balanceOf[msg.sender] >= _value);
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function _transfer(address _from, address _to, uint256 _value) internal {
        require(_to != address(0));
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value, balanceOf[_to]);
    }

    // Approve Tokens
    function approve(address _spender, uint256 _value) public returns (bool success){
        require(_spender != address(0));
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Transfer From
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value;
        _transfer(_from, _to, _value);
        return true;
    }

    function burnToken(address _user, uint256 _amount) public {
        require(_user != address(0), "ERC20: burn from the zero address");
        require(balanceOf[_user] > _amount, "ERC20: burn amount exceeds balance");
        balanceOf[_user] -= _amount;
        balanceOf[address(0)] += _amount;
        emit Burn(_user, _amount);
    }
}