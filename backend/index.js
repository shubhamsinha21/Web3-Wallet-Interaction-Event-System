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
const contractAddress = "0x1C08bdfe70F2e5CeD374f0F73e89F3237A21b2E1";

// ✅ Correct ABI
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "ActionLogged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "logAction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const contract = new ethers.Contract(contractAddress, abi, provider);

// ✅ Event listener
let lastBlock = 0;
const seenTx = new Set();

async function listenEvents() {
  try {
    const currentBlock = await provider.getBlockNumber();

    const MAX_RANGE = 40000;

    let fromBlock =
      lastBlock === 0 ? currentBlock - MAX_RANGE : lastBlock + 1;

    let toBlock = currentBlock;

    // 🔥 FIX invalid range
    if (fromBlock > toBlock) return;

    console.log("Checking blocks:", fromBlock, "to", toBlock);

    const events = await contract.queryFilter(
      "ActionLogged",
      fromBlock,
      toBlock
    );

    events.forEach((event) => {
      if (seenTx.has(event.transactionHash)) return;

      seenTx.add(event.transactionHash);

      const { user, message } = event.args;

      console.log("🚀 Event Detected:");
      console.log("User:", user);
      console.log("Message:", message);

      // 🔥 simulate backend logic
      console.log("Triggering backend workflow...");
    });

    lastBlock = toBlock;
  } catch (err) {
    console.error("Error fetching events:", err.message);
  }
}

setInterval(listenEvents, 5000);

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

