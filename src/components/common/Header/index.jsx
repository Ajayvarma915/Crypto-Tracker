import React from 'react'
import "./styles.css"

import AnchorTemporaryDrawer from './NavbarDrawer';
import Button from '../Button';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className='Navbar'>
      <h1 className='heading'>
              <Link to={'/'}>CryptoTracker</Link><span style={{ color: 'var(--blue)' }}>.</span>
      </h1>
      <div className="links">
        <Link to={'/'}><p className='link'>Home</p></Link>
        <Link to={'/compare'}><p className='link'>Compare</p></Link>
        <Link to={'/dashboard'}><Button text={"Dashboard"} onClick={()=>console.log("hello")} outlined={false}></Button></Link>
      </div>
      <div className='navbar_icon'><AnchorTemporaryDrawer/></div>
    </div>
  )
}

export default Header
