// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageBoard {
  struct Message {
    address sender;
    string content;
    uint timestamp;
  }

  Message[] public messages;

  event MessagePosted(address indexed sender, string content, uint timestamp);

  function postMessage(string calldata _content) external {
    messages.push(Message(msg.sender, _content, block.timestamp));
    emit MessagePosted(msg.sender, _content, block.timestamp);
  }

  function getMessages() external view returns (Message[] memory) {
    return messages;
  }
}