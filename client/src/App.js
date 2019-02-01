import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import IPFS from 'ipfs-api'
import PublicationList from './components/publicationList.jsx'
import IPFSUploader from './components/IPFSUploader.jsx'
import "./App.css";

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
// test https://ipfs.io/ipfs/QmPtmqeEnCNGZfFKfq254H5DBDviGStU1XvyoGsy2DmZvV


class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    fileBuffer: null,
    ipfsHash: null
  };

  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  }
  convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result)
    this.setState({ buffer })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash)
      const cid = ipfsHash[0].hash
      this.logCID(cid)
      this.setState({ ipfsHash: cid })
    })
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];

      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // subscribe to new cid
      instance.events.AddedCID({}, (error, data) => {
        if (error)
          console.log("Error: " + error);
        else
          console.log(data);
      });

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  logCID = async (cid) => {
    const { accounts, contract } = this.state

    await contract.methods.addCID(cid).send({ from: accounts[0], gas: 50000 })
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h2>Upload Publication</h2>
        <IPFSUploader/>
        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.captureFile} />
          <button type="submit">Send</button>
        </form>
        <div>{this.state.ipfsHash}</div>


        <h2>Publications</h2>
        <PublicationList contract={this.state.contract}/>
      </div>
    );
  }
}

export default App;
