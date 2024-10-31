const { ethers } = require('hardhat');

async function main() {
  const MessageBoard = await ethers.getContractFactory('MessageBoard');
  const messageboard = await MessageBoard.deploy(); // 用的是artifacts中生成的json ABI初始化合约
//   https://sepolia.etherscan.io/tx/0xc771e154ee89af5d6339c22aba51de81a2d653df16ecbb21daa995ec9c60e8ef
  console.log('contract address: ' + messageboard.target);  // address -> target https://github.com/WTFAcademy/WTF-Ethers/blob/main/06_DeployContract/readme.md
}

main();