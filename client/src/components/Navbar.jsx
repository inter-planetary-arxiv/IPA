import React, { Component } from 'react'
import styled from 'styled-components'
import MenuItem from './MenuItem'

class Navbar extends Component {
  state = { active: 'publications' }

  render() {
    return (
      <StyledNavbar>
        <Center>
          <ul>
            <li onClick={() => this.setState({ active: 'publications' })}>
              <MenuItem
                url="#publications"
                label="Publications"
                active={this.state.active === 'publications'}
              />
            </li>
            <li onClick={() => this.setState({ active: 'upload' })}>
              <MenuItem
                url="#upload"
                label="Upload"
                active={this.state.active === 'upload'}
                onClick={() => this.onMenuItemClick('upload')}
              />
            </li>
            <li onClick={() => this.setState({ active: 'about' })}>
              <MenuItem
                url="#about"
                label="About"
                active={this.state.active === 'about'}
                onClick={() => this.onMenuItemClick('about')}
              />
            </li>
          </ul>
        </Center>
      </StyledNavbar>
    )
  }
}

const StyledNavbar = styled.div`
  width: 100%;
  height: 64px;
  background: rgb(28, 29, 35);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  position: fixed;
`

const Center = styled.div`
  ul {
    display: flex;
    height: 100%;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 185px;
  }
  li.logo {
    width: 100px;
  }
  button {
    margin: 0 0 0 10px;
  }
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default Navbar
