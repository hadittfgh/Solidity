//SPDX-License-Identifier: GPL-3
pragma solidity >= 0.7.0 < 0.9.0;

contract Coin{
    address public minter ;

    mapping(address => uint) balances;

    event sendMessage(uint _amount, string message, address _To);

    constructor() {
        minter = msg.sender;
    }

    modifier onlyMinter(){
        require(msg.sender == minter,"only minter can mint");
        _;
    }

    modifier hasEnoughBalance(uint _amount) {
        require(balances[msg.sender] >= _amount,"Balance don't enuogh");
        _;
    }

    function mint(address _To,uint _amount) public onlyMinter{
        balances[_To] += _amount;
    }

    function getBalance() public view returns(uint){
        uint myBalance = balances[msg.sender];
        return myBalance;
    }

    function transfer(address _To, uint _amount) public hasEnoughBalance(_amount){
        balances[msg.sender] -= _amount;
        balances[_To] += _amount;

        emit sendMessage(_amount, "Tokens send succesful to ", _To);
    }

}
