import React, { useState, useEffect } from "react";
import { Button, Input, Tooltip } from "antd";
import { ethers } from "ethers";
import dayjs from "dayjs";
import MessageBoardArtifact from "../static/contracts/MessageBoard.json";
import MessageBoardAddress from "../static/address/MessageBoardAddress.json";
import { Comment, Avatar } from "@arco-design/web-react";
import { CopyOutlined } from "@ant-design/icons";

import "@arco-design/web-react/dist/css/arco.css";
import "./arco.css";

const { TextArea } = Input;

// 合约地址和ABI
const contractAddress = MessageBoardAddress.sepolia;
const contractABI = MessageBoardArtifact.abi;

const MessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentNetwork, setCurrentNetwork] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      if (window.ethereum) {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        const _contract = new ethers.Contract(
          contractAddress,
          contractABI,
          _provider
        );
        setProvider(_provider);
        setContract(_contract);
      }
    };

    initialize();
  }, []);

  // 1. 连接钱包
  const connectWallet = async () => {
    checkMetamaskInstallation();
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("accounts" + JSON.stringify(accounts));
      const currentAccount = accounts[0];
      setProvider(provider);
      setCurrentAccount(currentAccount);
      getNetworkInfo();
      if (contract) {
        await fetchMessages(contract);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNetworkInfo = async () => {
    const network = await provider.getNetwork();
    console.log("当前网络名称:", network.name);
    console.log("当前 Chain ID:", network.chainId);
    setCurrentNetwork(network.name);
  };

  // 0. 是否安装
  const checkMetamaskInstallation = () => {
    if (window.ethereum === undefined) {
      alert("Metamask wallet is not installed! Install please");
      return;
    }
  };

  // 查列表
  const fetchMessages = async (_contract) => {
    let messages = await _contract.getMessages();
    console.log("messages.length: " + messages.length);
    setMessages(messages);
  };

  // 发布留言
  const handleSubmit = async (e) => {
    // debugger;
    try {
      // e.preventDefault();
      if (newMessage.trim() && contract) {
        const signer = await provider.getSigner();
        let contractWithSigner = contract.connect(signer);
        console.dir("==contractWithSigner: " + contractWithSigner);
        console.log("newMessage: " + newMessage);
        const tx = await contractWithSigner.postMessage(newMessage);
        await tx.wait(); // 等待交易确认
        setNewMessage("");
        await fetchMessages(contract); // 更新留言列表
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CopyText = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000); // 2秒后重置状态
        })
        .catch((err) => console.error("复制失败:", err));
    };

    return (
      <Tooltip title={isCopied ? "已复制" : "复制地址"} placement="top">
        <CopyOutlined
          onClick={handleCopy}
          style={{
            color: isCopied ? "#1890ff" : "#999", // 复制后颜色
            cursor: "pointer",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1890ff")} // hover 颜色
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = isCopied ? "#1890ff" : "#999")
          } // 还原颜色
        />
      </Tooltip>
    );
  };

  return (
    <div style={{ width: "80%", padding: "20px" }}>
      <h2>钱包</h2>
      {!!!currentAccount ? (
        <Button type="primary" size="large" onClick={connectWallet}>
          连接 MetaMask
        </Button>
      ) : (
        <ul>
          <li key="account">
            当前账户地址: {currentAccount} <CopyText text={currentAccount} />
          </li>
          <li key="network">当前网络名称: {currentNetwork}</li>
        </ul>
      )}
      <h2>留言</h2>
      <form>
        <TextArea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="请输入留言..."
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <Button style={{ marginTop: 10 }} onClick={handleSubmit}>
          发布
        </Button>
      </form>

      <h2>列表（共 {messages.length} 条）</h2>
      <div>
        {messages.length === 0 ? (
          <p>暂无留言</p>
        ) : (
          messages.map((message, index) => (
            <Comment
              // actions={actions}
              align="right"
              author={message.sender}
              avatar={
                <Avatar>
                  <img
                    alt="avatar"
                    src={`https://ui-avatars.com/api/name=${message.sender.slice(
                      -2
                    )}&background=random`}
                  />
                </Avatar>
              }
              content={<div> {message.content}</div>}
              datetime={dayjs(Number(message.timestamp) * 1000).format(
                "YYYY年MM月DD日 HH:mm:ss"
              )}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MessageBoard;
