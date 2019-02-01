import React, { Component } from 'react';
import { FilePond } from 'react-filepond'
import IPFS from 'ipfs-api'
import 'filepond/dist/filepond.min.css'

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class IPFSUploader extends Component {
  process = async (fieldName, file, metadata, load, error, progress, abort) => {
    // Read file, upload file to IPFS, register File in Ethereum
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      const buffer = await Buffer.from(reader.result)

      // Upload file to IPFS
      const cid = await ipfs.add(buffer, async (err, ipfsHash) => {
        if(err)
          console.err('ipfs error': err)
        const cid = ipfsHash[0].hash

        // Register CID in Ethereum
        await this.props.contract.methods.addCID(cid).send({
          from: this.props.accounts[0], gas: 50000
        })

        // progress(true, 100, 100)
        load(cid)
      })
    }

    return {
      abort
    }
  }

  render() {
    return (
      <FilePond
        onaddfilestart={file => {
          console.log(file)
        }}
        server={{
          process: this.process,
          fetch: null,
          revert: null
        }}
        instantUpload={true}
      />
    )
  }
}

export default IPFSUploader
