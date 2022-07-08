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
  }

  // Connect wallet function 
  const connectWallet = async () => {
    
  }

  const accounts = await ethereum.request({ method: 'eth_accounts' });
  
  if (accounts.length !== 0) {
    const account = accounts[0];
    console.log("Validated account:", account);
    setCurrentAccount(account);
  } else {
    console.log("No account");
  }


  return (
    <div>
      <h1 center>Hello World!</h1>
    </div>
  );
}

export default App;
