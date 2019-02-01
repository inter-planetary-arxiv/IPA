import React, { Component } from 'react';
import { FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

class IPFSUploader extends Component {
  render() {
    return (
      <FilePond
        allowMultiple={true}

        onaddfilestart={file => {
          console.log(file)
        }}
        server={{
          process: (fieldName, file, metadata, load, error, progress, abort) => {
            console.log('file upload', file)
            progress(true, 100, 100)
            load(123)
            return {
              abort
            }
          },
          fetch: null,
          revert: null
        }}
        instantUpload={true}
      />
    )
  }
}

export default IPFSUploader
