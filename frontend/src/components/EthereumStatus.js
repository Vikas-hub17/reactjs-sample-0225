import React, { useState, useEffect } from 'react';
import { InfuraProvider } from 'ethers';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #f4f5f7;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StatusCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 300px;
`;

function EthereumStatus() {
  const [blockNumber, setBlockNumber] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_INFURA_PROJECT_ID' with your actual Infura project ID.
    const provider = new InfuraProvider('homestead', 'YOUR_INFURA_PROJECT_ID');
    
    provider.getBlockNumber()
      .then((block) => setBlockNumber(block))
      .catch((err) => console.error("Error fetching block number", err));
  }, []);

  return (
    <Container>
      <StatusCard>
        <h2>Ethereum Network Status</h2>
        {blockNumber ? <p>Current Block Number: {blockNumber}</p> : <p>Loading block number...</p>}
      </StatusCard>
    </Container>
  );
}

export default EthereumStatus;
