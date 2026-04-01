import { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0x1C08bdfe70F2e5CeD374f0F73e89F3237A21b2E1";

const abi = [
  "function logAction(string _message)"
];

function App() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Ready");
  const [loading, setLoading] = useState(false);

  async function sendTransaction() {
    try {
      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      setLoading(true);
      setStatus("Connecting wallet...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      await provider.send("wallet_switchEthereumChain", [
        { chainId: "0xaa36a7" }
      ]);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      setStatus("Sending transaction...");

      const tx = await contract.logAction(message);
      await tx.wait();

      setStatus("Transaction successful ✅");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("Error ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h2 style={styles.title}>
          Web3 Event System 🚀
        </h2>

        <p style={styles.subtitle}>
          From blockchain events to backend actions
        </p>

        <input
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={sendTransaction}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Processing..." : "Send Transaction"}
        </button>

        <div style={styles.statusBox}>
          <span style={styles.statusLabel}>Status:</span>
          <span style={styles.statusText}>{status}</span>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    fontFamily: "system-ui"
  },
  card: {
    background: "#111827",
    padding: "32px",
    borderRadius: "16px",
    width: "380px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
  },
  title: {
    textAlign: "center",
    marginBottom: "10px"
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#9ca3af",
    marginBottom: "20px"
  },
  input: {
    width: "93%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #374151",
    background: "#020617",
    color: "white",
    marginBottom: "15px",
    outline: "none"
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "white",
    fontWeight: "bold",
    transition: "0.2s"
  },
  statusBox: {
    marginTop: "18px",
    padding: "10px",
    borderRadius: "8px",
    background: "#020617",
    display: "flex",
    justifyContent: "space-between"
  },
  statusLabel: {
    color: "#9ca3af",
    fontSize: "13px"
  },
  statusText: {
    fontSize: "13px"
  }
};

export default App;