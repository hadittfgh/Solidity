pragma solidity 0.5.16;

contract Sum{
    uint private num;

    constructor() public{
        num = 0;
    }

    function getNum() public view returns(uint){
        return num;
    }

    function sum(uint num1, uint num2) public pure returns(uint){
        return num1 + num2;
    }
}