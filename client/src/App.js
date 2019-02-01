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
  };

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

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h2>Upload Publication</h2>
        <IPFSUploader accounts={this.state.accounts} contract={this.state.contract} />

        <h2>Publications</h2>
        <PublicationList contract={this.state.contract}/>
      </div>
    );
  }
}

export default App;
