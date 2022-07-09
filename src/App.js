import react, { useEffect, useState } from 'react';
import{ ethers } from "ethers";
import './App.css';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  // See if user already has Metamask connected
  const checkIfWalletConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("You need a MetaMask wallet to proceed");
      return;
    } else {
      console.log("Ethereum Objected Found!", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
  
  if (accounts.length !== 0) {
    const account = accounts[0];
    console.log("Validated account:", account);
    setCurrentAccount(account);
  } else {
    console.log("No account");
  }
}

  // Connect wallet function 
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("You need Metamask to proceed");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0])
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const callConnectWallet = () => (
    <button onClick={connectWallet}>
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletConnected();
  }, [])

  return (
    <div>
      <h1>SecureVote</h1>
      <div>
        {currentAccount === "" ? callConnectWallet() : false}
      </div>
    </div>
  );
}

export default App;
