import React from 'react'

const Header = ({ msg }) => {
  return (
    <nav style={{background: "#c59771bd", padding:"16px 32px"}}>
      <h1>{msg}</h1>
    </nav>
  )
}

export default Header