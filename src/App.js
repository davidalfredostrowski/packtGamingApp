import React,{ Component } from 'react'
import Web3 from 'web3'
import './App.css';



class App extends Component{


    constructor(props){
	super(props)
	this.state = { selectedOption: ' ', wager: 0, account: '', player1: '' ,
            playerNumber: '',
            highLow: 'lower',
            wager: '2',
            historyData: [],
            snackbar: false,
            message: '',
            currentBalance: '',
 	    owner: '',
            player1: '',
	    web3: '',
            displayNumber: '', 
	    won: '',
            playerBalance: ''
	}
	this.handleChange = this.handleChange.bind(this)
        this.onValueChange = this.onValueChange.bind(this);
    }


    componentWillMount(){
 	this.loadBlockchainData()
    }


    async loadBlockchainData(){
        alert ("loadblockchaindata starts again")
	console.log('just before the connect')
	const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-35-88-37-88.us-west-2.compute.amazonaws.com:8545"))
	this.setState({ web3 : web3 })
	const accounts = await web3.eth.getAccounts()
	console.log("account", accounts[0])
	console.log("account1", accounts[1])
	this.setState({ account: accounts[0] })
	const owner = accounts[0]
	const player1 = accounts[1]
	//this.setState({ player1: accounts[1] })
	this.setState({ player1: player1 })
        let jsonData = require('./Gaming.json');     
        const networkId = await web3.eth.net.getId();
        var networkKey =  Object.keys(jsonData['networks'])[Object.keys(jsonData.networks).length-1] 
        const contract = new web3.eth.Contract(jsonData.abi); 
        contract.options.address = jsonData['networks'][networkId]["address"]
	this.setState({ contract }) 
	this.setState({ data: contract })
	this.setState({ contract: contract })
        this.setState({ owner: owner })

	const initialBalance = await web3.eth.getBalance(owner)
	alert("initialBalance owner    " + String(initialBalance));
	console.log("initialBalance owner",initialBalance)
	const initialBalanceInEther = Number(web3.utils.fromWei(initialBalance, 'ether'))
	alert("initialBalanceInEther owner  " + String(initialBalanceInEther));
	console.log("initialBalanceInEther owner",initialBalanceInEther)
		;
        let ans = await contract.methods.fundGame().send({from: owner, value: web3.utils.toWei('10', 'ether')}).then((f) => console.log(f))


	//   two parameters this time: ( will mystery number be higher or lower than your given umber are higher(true) or lower(false)    )
        //contract.methods.transferFunds(owner)
        const newBalance = await web3.eth.getBalance(owner)
        alert("newBalance of owner    " + String(newBalance));
        console.log("newBalance",newBalance)
        const newBalanceInEther = Number(web3.utils.fromWei(newBalance, 'ether'))
        alert("newBalanceInEther of owner  " + String(newBalanceInEther));
        console.log("newBalanceInEther",newBalanceInEther)
        const initialPlayerBalance = await web3.eth.getBalance(player1)
        const initialPlayerBalanceInEither = Number(web3.utils.fromWei(initialPlayerBalance, 'ether'))
        alert("initialPlayerBalanceInEither player1:" + String( initialPlayerBalanceInEither ))
        ans = await this.state.contract.methods.winOrLose(0, true ).send({from: this.state.player1 ,value: this.state.web3.utils.toWei('4', 'ether')}).then((f) => console.log(f))

        const updatedPlayerBalance = await web3.eth.getBalance(player1)
        const updatedPlayerBalanceInEither = Number(web3.utils.fromWei(updatedPlayerBalance, 'ether'))
        alert("updatedPlayerBalanceInEither:" + String( updatedPlayerBalanceInEither ))

        this.setState({ account: accounts[0] })

        var randNum =  Math.floor(Math.random() * 10) + 1;
        this.setState({displayNumber : randNum })

	    // true:  mystery number > player
    }



 play = async () => {

        const { selectedOption, wager } = this.state
	let  HigherThanMysteryNumber = "true"
	if (this.state.selectedOption == "High") {
		HigherThanMysteryNumber = true
	}
	else{
		HigherThanMysteryNumber = false
	}
	// 'true' is mystery number higher than mine. 
	 console.log("this.state.wager ",this.state.wager)	
        let ans = await this.state.contract.methods.winOrLose(this.state.displayNumber, true ).send({from: this.state.player1 ,value: this.state.web3.utils.toWei(this.state.wager, 'ether')}).then((f) => console.log(f))

        let updatedPlayerBalance = await this.state.web3.eth.getBalance(this.state.player1)
        let updatedPlayerBalanceInEther = Number(this.state.web3.utils.fromWei(updatedPlayerBalance, 'ether'))


	this.setState( { playerBalance : updatedPlayerBalanceInEther } )


}



// input changes of all the input field using ES6
// javascript feature computed property names
handleChange(event){
    this.setState({
      wager: event.target.value
    });
}

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
}
// Return a controlled form i.e. values of the
// input field not stored in DOM values are exist
// in react component itself as state
render(){
	return(
       <>
	<div className="radio">
          <label>
            <input
              type="radio"
              value="High"
              checked={this.state.selectedOption === "High"}
              onChange={this.onValueChange}
            />
            Mystery number is higher
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Low"
              checked={this.state.selectedOption === "Low"}
              onChange={this.onValueChange}
            />
            Mystery Number is lower
          </label>
        </div>      



	<div>
          Selected option is : {this.state.selectedOption}
        </div>
	<div>
		Display number:      {this.state.displayNumber}
        </div>

        <div>
		player balance : { this.state.playerBalance }
        </div>



        <div>
                   <button onClick={this.play}> Play Round</button>
        </div>

</>
	)
}
}

export default App 
