pragma solidity 0.5.16;

contract Gaming {
    /* Our Online gaming contract */
    address public owner;
    bool online;

 
    mapping (address => Player) public players; 
    
    uint public wins;    /* public didnt allow me any advantage */
    uint public losses;
 
    struct Player {
        address player;
        string playerName;
        uint playerBalance;
        uint wins;
        uint losses;
    }

    constructor() public payable {
        owner = msg.sender;
        online = true;
        players[address(0)] = Player(msg.sender, "Test Player", 0, 1, 2);
    }

    modifier isOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    event PlayerWon(address player, uint amount, uint mysteryNumber, uint displayedNumber);
    event PlayerLost(address player, uint amount, uint mysteryNumber, uint displayedNumber);

    event GameFunded(address funder, uint amount);
    

    function getOnline() external view returns ( bool ){
	return online;
    }


    function mysteryNumber() internal view returns (uint) {
        uint randomNumber = uint(blockhash(block.number-1))%10 + 1;
        return randomNumber;
    }

    function determineWinner(uint number, uint display, bool guess) public pure returns (bool) {
        if (guess == true) {
            if (number > display) {
                return true;
            }
        } else if (guess == false) {
            if (number > display) {
                return false;
            }
        }
    }
// Here the 'bool guess' as 'true' states that the mystery number
// is higher than my displayed number

// Here the 'bool guess' as 'false' states that the mystery number
// is lower than my displayed number


// the 'sender' could in this case be the 'owner'
// how to obtain the contract balance in the console?


    function winOrLose(uint display, bool guess) external payable returns (bool) {
        /* Use true for a higher guess, false for a lower guess */
        require(online == true);
        require(msg.sender.balance > 1, "Insufficient funds");
        uint mysteryNumber_ = mysteryNumber();
        bool isWinner = determineWinner(mysteryNumber_, display, guess);
        if (isWinner == true) {
            /* Player won */
            msg.sender.transfer(msg.value * 2);
            return true;
        } else if (isWinner == false) {
            /* Player lost .... they already send the money to contract  */
            /*  in the case of a loss.... it stays in the conract !!!!!! */
            /* no need to delete / send  */
            
            return false;
        }
    }


    function withdrawFunds() public isOwner {
        msg.sender.transfer(address(this).balance);
    }
   
    function fundGame() public isOwner payable {
        emit GameFunded(msg.sender, msg.value);
    }
    

    function sftwo(address payable _to) external payable {
       bool sent =        _to.send(msg.value);
       require(sent, "failed to send ether");

    }

    function sendToPlayer(address payable _to) external payable {
       bool sent =        _to.send(msg.value);
       require(sent, "failed to send ether");

    }



    function transferFnew() public isOwner payable{
        msg.sender.transfer(msg.value);
    }

    function sendCoin() public payable{ 
    } 






}

