import react, { useEffect, useState } from 'react';
import{ ethers } from "ethers";
import abi from "./utils/votecontract.json";
import './styles/App.css';
import './images/anonymous-sec-whistleblower.jpg';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allVotes, setAllVotes ]= useState(0);
  const [currentVotesForA, setVotesForA] = useState(0);
  const [currentVotesForB, setVotesForB] = useState(0);
  const contractAddress = "0x3aB1dAa6397798EB09e40F8976427a7dB7F9c006";
  const contractABI = abi.abi;

  const getAllVotes = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(contractAddress, contractABI, signer);

        let votes = await voteContract.getTotalVotes();
        setAllVotes(votes.toNumber());

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

        const aVoteForA = await voteContract.voteForA({ gasLimit: 30000 });
        console.log("Mining:", aVoteForA.hash);

        await aVoteForA.wait();
        console.log("Mined:", aVoteForA.hash);

        setVotesForA(aVoteForA.toNumber());

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

        const aVoteForB = await voteContract.voteForB({ gasLimit: 30000 });
        console.log("Mining:", aVoteForB.hash);

        await aVoteForB.wait();
        console.log("Mined", aVoteForB.hash);

        setVotesForB(aVoteForB.toNumber());

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
    <button className='connect-wallet-button' onClick={connectWallet}>
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
          <image></image>
        </div>
        <div>
        <button className='vote-button-a' onClick={voteForCandidateA}>
          Vote for Candidate A
        </button>
        <button className='vote-button-b' onClick={voteForCandidateB}>
          Vote for Candidate B
        </button>
        </div>
        <div>
          <h3>Total Votes: {allVotes}</h3>
          <h3>Votes for A: {currentVotesForA}</h3>
          <h3>Votes for B: {currentVotesForB}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;