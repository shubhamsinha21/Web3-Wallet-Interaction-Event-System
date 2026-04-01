## Web3 Event-Driven Backend System

### Overview
This project demonstrates how on-chain smart contract events can trigger backend systems, simulating real-world Web3 application architecture.

### Architecture
Frontend (React) → Smart Contract → Event Emission → Backend Listener (Node.js)

### Features
- Wallet connection via MetaMask
- Smart contract interaction using ethers.js
- Event emission on blockchain
- Backend listener capturing events using polling (queryFilter)
- Simulated backend automation trigger

### Key Learning
Instead of relying on unstable RPC filters, I implemented block-based polling to reliably capture events. This approach aligns more closely with production-grade Web3 backend systems.

### Tech Stack
- Solidity
- React.js
- Node.js
- Ethers.js

### Why this matters
Most Web3 demos stop at contract interaction. This project explores how blockchain events integrate with backend systems, which is critical for real-world applications like notifications, automation, and analytics.