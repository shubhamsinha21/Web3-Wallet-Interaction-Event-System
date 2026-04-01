# 🚀 Web3 Event → Backend System

> From blockchain events to backend actions

---

## 🧠 Overview

This project demonstrates how on-chain smart contract events can trigger backend workflows, simulating real-world Web3 system design.

Instead of stopping at contract interaction, this system connects:
- Frontend user action
- Smart contract execution
- Event emission on blockchain
- Backend event detection and processing

---

## ⚙️ Architecture

Frontend (React)  
⬇  
Smart Contract (Solidity)  
⬇  
Event Emission (Sepolia)  
⬇  
Backend Listener (Node.js + ethers.js)  
⬇  
Backend Workflow Trigger

---

## ✨ Features

- 🔗 Wallet connection via MetaMask
- ⛓️ Smart contract interaction using ethers.js
- 📡 Event emission on blockchain
- 🔄 Backend listener using block polling (`queryFilter`)
- ⚙️ Event-driven backend workflow simulation
- 🌐 Sepolia testnet deployment

---

## 🧩 Key Engineering Insight

Most Web3 demos rely on RPC filters for event listening, which are unreliable in real-world scenarios.

This project uses:

> **Block-based polling with `queryFilter`**

to ensure:
- Reliable event detection
- No dependency on unstable RPC filters
- Production-aligned backend design

---

## 🛠 Tech Stack

- Solidity
- React.js
- Node.js
- ethers.js
- MetaMask
- Sepolia Testnet

---

## 📸 Screenshots

### 🖥 Frontend UI
![UI Screenshot](./screenshots/ui.png)

### ⚙️ Backend Event Detection
![Backend Screenshot](./screenshots/backend.png)

---

## 🚀 How It Works

1. User enters a message in UI  
2. Transaction sent via MetaMask  
3. Smart contract logs event  
4. Backend polls blockchain  
5. Event detected → backend workflow triggered  

---

## 📂 Project Structure
