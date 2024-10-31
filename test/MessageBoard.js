const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('MessageBoard Contract', function () {
  it('Post and get messages', async function () {
    const MessageBoard = await ethers.getContractFactory('MessageBoard');
    const messageboard = await MessageBoard.deploy();
    // await messageBoard.deployed();
    await messageboard.waitForDeployment();
    console.log('contract address: ' + messageboard.address);

    await messageboard.postMessage('Hello, Web3!');
    const messages = await messageboard.getMessages();

    expect(messages[0].content).to.equal('Hello, Web3!');
  });
});
