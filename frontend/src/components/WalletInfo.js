import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { BrowserProvider, formatEther, Contract } from "ethers";

const UNISWAP_ETH_PRICE_FEED = "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419"; // Uniswap ETH/USD Price Oracle

const WalletInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState(location.state?.address || "Fetching...");
  const [walletBalance, setWalletBalance] = useState(location.state?.balance || "Fetching...");
  const [networkName, setNetworkName] = useState("Fetching...");
  const [ethPrice, setEthPrice] = useState("Fetching...");
  const [transactions, setTransactions] = useState([]); // ✅ Always an array

  useEffect(() => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      navigate("/");
      return;
    }

    const fetchWalletData = async () => {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();

        setWalletAddress(address);
        setWalletBalance(formatEther(balance) + " ETH");
        setNetworkName(network.name || "Unknown Network");

        // Fetch ETH price using Uniswap price oracle
        fetchEthPrice(provider);

        // Fetch transactions
        fetchTransactions(provider, address);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchWalletData();
  }, [navigate]);

  // Fetch ETH Price using Uniswap Smart Contract (No API Key)
  const fetchEthPrice = async (provider) => {
    try {
      const abi = ["function latestAnswer() public view returns (int256)"];
      const contract = new Contract(UNISWAP_ETH_PRICE_FEED, abi, provider);
      const price = await contract.latestAnswer();
      setEthPrice(`$${(Number(price) / 1e8).toFixed(2)}`);
    } catch (error) {
      console.error("Error fetching ETH price:", error);
      setEthPrice("Unavailable");
    }
  };

  // Fetch Transactions (No API Key)
  const fetchTransactions = async (provider, address) => {
    try {
      const blockNumber = await provider.getBlockNumber();
      const recentBlocks = 500; // Adjust as needed
      let fetchedTransactions = [];

      for (let i = blockNumber; i > blockNumber - recentBlocks; i--) {
        const block = await provider.getBlockWithTransactions(i);
        const userTransactions = block.transactions.filter(tx => tx.from === address || tx.to === address);
        fetchedTransactions = [...fetchedTransactions, ...userTransactions];

        if (fetchedTransactions.length >= 5) break; // Only keep last 5 transactions
      }

      setTransactions(fetchedTransactions.slice(0, 5));
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]); // Prevents `.map()` error
    }
  };

  return (
    <Container>
      <Header>
        <Title>🚀 Wallet Dashboard</Title>
        <BackButton onClick={() => navigate("/")}>← Back</BackButton>
      </Header>

      <WalletCard>
        <WalletText><strong>🔗 Address:</strong> {walletAddress}</WalletText>
        <WalletText><strong>💰 Balance:</strong> {walletBalance}</WalletText>
        <WalletText><strong>🌐 Network:</strong> {networkName}</WalletText>
        <WalletText><strong>📈 ETH Price:</strong> {ethPrice}</WalletText>
      </WalletCard>

      <TransactionSection>
        <h3>📜 Recent Transactions</h3>
        <TransactionList>
          {transactions.length === 0 ? (
            <TxDetail>No transactions found.</TxDetail>
          ) : (
            transactions.map((tx) => (
              <Transaction key={tx.hash}>
                <TxDetail>📤 To: {tx.to ? tx.to.slice(0, 10) + "..." : "N/A"}</TxDetail>
                <TxDetail>💵 Amount: {formatEther(tx.value)} ETH</TxDetail>
                <TxDetail>⏳ Gas: {tx.gasLimit.toString()}</TxDetail>
                <TxDetail>🔗 Hash: {tx.hash.slice(0, 10)}...</TxDetail>
              </Transaction>
            ))
          )}
        </TransactionList>
      </TransactionSection>
    </Container>
  );
};

// Styled Components (Futuristic Look)
const neonGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.5); }
  50% { box-shadow: 0 0 15px rgba(0, 255, 255, 1); }
  100% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.5); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  font-family: 'Orbitron', sans-serif;
  background: #0a0a0a;
  color: #0ff;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 255, 255, 0.1);
  border: 2px solid rgba(0, 255, 255, 0.5);
  padding: 15px;
  border-radius: 12px;
  animation: ${neonGlow} 1.5s infinite alternate;
`;

const Title = styled.h2`
  font-weight: bold;
  color: #0ff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
`;

const BackButton = styled.button`
  background: transparent;
  color: #0ff;
  border: 2px solid #0ff;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(0, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

const WalletCard = styled.div`
  background: rgba(0, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  padding: 20px;
  margin-top: 20px;
  border-radius: 12px;
  border: 2px solid rgba(0, 255, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  text-align: left;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const WalletText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #0ff;
`;

const TransactionSection = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Transaction = styled.div`
  background: rgba(0, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 15px;
  border-radius: 12px;
  margin-top: 10px;
  border: 2px solid rgba(0, 255, 255, 0.5);
  width: 80%;
`;

const TxDetail = styled.p`
  font-size: 14px;
  color: #0ff;
`;

export default WalletInfo;
