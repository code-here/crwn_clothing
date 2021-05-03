import React from 'react';
import { ReactComponent as Logo } from '../../asssets/crown.svg';
import { Link } from 'react-router-dom';
import './Header.style.scss';
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => (
  <div className="header">
    <div className="logo-container">
      <Link to="/"><Logo className="logo" /></Link>
    </div>
    <div className="options">
      <Link className="option" to="/shop">shop</Link>
      <Link className="option" to="/contact">contact</Link>
      
      {console.log(currentUser)}
      {
        currentUser ? 
        <Link className="option" onClick={() => auth.signOut()} to="/">Sign out</Link>
        :
        <Link className="option" to="/signin">Sign in</Link>
      }
    </div>
  </div>
)

export default Header;