import react, { useEffect, useState } from 'react';
import{ ethers } from "ethers";
import abi from "./utils/votecontract.json";
import './App.css';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xFd96d09dbabD1eae98A766426a38247DF8A2Be5D";
  const contractABI = abi.abi

  const getAllVotes = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(contractAddress, contractABI, signer);

        const votes = await voteContract.getTotalVotes();
        return votes;
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  }

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
    getAllVotes();
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

  const voteForCandidateA = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await voteContract.getTotalVotes();
        console.log("Total vote count:", count.toNumber());

        const voteTxn = await voteContract.voteForA({ gasLimit: 30000 });
        console.log("Mining:", voteTxn.hash);

        await voteTxn.wait();
        console.log("Mined:", voteTxn.hash);

        count = await voteContract.getTotalVotes();
        console.log("Total vote count:", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const voteForCandidateB = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await voteContract.getTotalVotes();
        console.log("Total vote count:", count.toNumber());

        const voteTxn = await voteContract.voteForB({ gasLimit: 30000 });
        console.log("Mining:", voteTxn.hash);

        await voteTxn.wait();
        console.log("Mined", voteTxn.hash);

        count = await voteContract.getTotalVotes();
        console.log("Total vote count:", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
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
    <div className='App'>
      <h1 className='App-header'>SecureVote</h1>
      <div>
        {currentAccount === "" ? callConnectWallet() : false}
        <div>
        <button onClick={voteForCandidateA}>
          Vote for Candidate A
        </button>
        </div>
        <button onClick={voteForCandidateB}>
          Vote for Candidate B
        </button>
        <div>
          <h3>Total Votes: {getAllVotes} </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
