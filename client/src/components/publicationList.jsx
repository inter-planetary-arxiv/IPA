import React, { Component, Fragment } from 'react'

class PublicationList extends Component {
  state = { publications: [] }

  componentDidMount = async () => {
    console.log('mount')
    try {
      const events = await this.props.contract.getPastEvents('AddedCID', { fromBlock: 0, toBlock: 'latest'})
      const publications = events.map(event => event.returnValues[0])

      this.setState({ publications })
    } catch (error) {
      alert('Failed to load web3 or contract. Check console for details.')
      console.error(error)
    }
  }

  render() {
    return (
      <Fragment>
        <ul>
          {this.state.publications.map(
            (publication, index) =>
              <li key={index}>
                <a
                  href={`https://ipfs.io/ipfs/${publication}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {publication}
                </a>
              </li>
          )}
        </ul>
      </Fragment>
    )
  }
}

export default PublicationList
