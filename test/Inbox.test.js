const assert = require('assert');
const ganache = require('ganache-cli');
//constructor, constructors start with capitals.
const Web3 = require('web3');
//instance, replace 'ganache' with different provider to connect to different Ethereum networks
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


let accounts;
let inbox;

beforeEach(async () => {
  //Get a list of all accounts
  accounts = await web3.eth.getAccounts()

  //use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data:
      bytecode,
      arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    //first '()' is for an argument, second '()' is used to customize transaction for network, for instance, who is paying for transaction and how much gass to use.
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('Bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Bye');
  });
});

/*
//TEST EXAMPLE
class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
};
//The test. Making the 'car' variable here allows it to be in both the 'beforeEach' and 'describe' functions
let car;

//any logic written below will appear before each 'it' statement in the code
beforeEach(() => {
  car = new Car();
});

//describe groups tests of the same thing, 'Car' is for our testing report only and not related to the class 'Car'
describe('Car', () => {
//it will contain a string, describing the purpose of the test we are about to write
  it('can park', () => {
    //here goes test logic instance
    assert.equal(car.park(), 'stopped')
  });

  it('can drive', () => {
    assert.equal(car.drive(), 'vroom')
  });
});
*/
