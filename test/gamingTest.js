const Gaming = artifacts.require('./Gaming.sol')

contract('Gaming', async (accounts) => {
  let gaming
  const owner = accounts[0]
  const player1 = accounts[1]

  before(async () => {
    gaming = await Gaming.deployed()
    const fundGame = await gaming.sendCoin({from: accounts[2], value: web3.utils.toWei('10', 'ether')})
 

const jsonData = require('./Gaming.json')
gaming = await Gaming.deployed()
networkKey = await Object.keys(jsonData['networks'])[Object.keys(jsonData.networks).length-1]
console.log("networkKey")
console.log(networkKey)
const balance = await web3.eth.getBalance(jsonData['networks'][networkKey]["address"])

console.log("balance")
console.log(balance)





  })

  it('no sense Should record player losses', async() => {
    const initialBalance = await web3.eth.getBalance(player1)
    const initialBalanceInEther = Number(web3.utils.fromWei(initialBalance, 'ether'))
    const gameRound = await gaming.winOrLose(10, true, {
      from: player1,
      value: web3.utils.toWei('1', 'ether')
    })
    const postBalance = await web3.eth.getBalance(player1)
    const postBalanceInEther = Number(web3.utils.fromWei(postBalance, 'ether'))
    const playerStats = await gaming.players(player1)
    assert.equal(playerStats[1].loss.toNumber(), 1, 'The player should have 1 loss')
    assert.isAtLeast(initialBalanceInEther, postBalanceInEther + 1, 'Player account should have decreased by the amount of the wager')
  })

  it('Should record player wins', async() => {
    const gameRound = await gaming.winOrLose(10, false, {
      from: player1,
      value: web3.utils.toWei('1', 'ether')
    })
    const playerStats = await gaming.players(player1)
  //  assert.equal(playerStats[0].toNumber(), 1, 'The player should have 1 win')
  })

 it('test the withdrawal', async() => {
const initialBalance = await web3.eth.getBalance(owner)
console.log( "owner")
	 console.log(initialBalance)

fundGame = await gaming.withdrawFunds()

const updatedBalance = await web3.eth.getBalance(owner)
console.log("updated balance")
	 console.log(updatedBalance)
 })



})

