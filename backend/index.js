const { ethers } = require("ethers");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// ✅ Working RPC
const provider = new ethers.JsonRpcProvider(
  "https://ethereum-sepolia-rpc.publicnode.com"
);

// ✅ Replace with REAL contract address
const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

// ✅ Correct ABI
const abi = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "message", "type": "string" }
    ],
    "name": "ActionLogged",
    "type": "event"
  }
];

const contract = new ethers.Contract(contractAddress, abi, provider);

// ✅ Event listener
let lastBlock = 0;

async function listenEvents() {
  const currentBlock = await provider.getBlockNumber();

  const fromBlock = lastBlock === 0 ? currentBlock - 10 : lastBlock;

  const events = await contract.queryFilter(
    "ActionLogged",
    fromBlock,
    currentBlock
  );

  events.forEach((event) => {
    const { user, message } = event.args;

    console.log("🚀 Event Detected:");
    console.log("User:", user);
    console.log("Message:", message);
  });

  lastBlock = currentBlock;
}

// Poll every 5 seconds
setInterval(listenEvents, 5000);

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

