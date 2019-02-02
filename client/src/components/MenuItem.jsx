import React from 'react'
import styled from 'styled-components'

const MenuItem = ({ url, label, active }) => (
  <StyledMenuItem className={active ? 'active' : undefined}>
    <a href={url}>{label}</a>
  </StyledMenuItem>
)

const StyledMenuItem = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100%;
  a {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 50px;
    text-decoration: none;
    font-size: 17px;
    white-space: nowrap;
    color: #ffffff;
    &:hover {
      color: #22e0ff;
    }
    &:focus {
      outline: 0;
      &:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 0;
        right: 0;
        bottom: 0;
        outline: 2px solid #22e0ff;
      }
    }
    &:active:after {
      display: none;
    }
  }
  &.active a {
    color: #22e0ff;
    font-weight: 800;
  }
`

export default MenuItem
