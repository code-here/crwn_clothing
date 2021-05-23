import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.style.scss';

import { ReactComponent as Logo } from '../../asssets/crown.svg';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <div className="logo-container">
      <Link to="/"><Logo className="logo" /></Link>
    </div>
    <div className="options">
      <Link className="option" to="/shop">shop</Link>
      <Link className="option" to="/contact">contact</Link>
      {
        currentUser ? 
        <div className="option" onClick={() => auth.signOut()} >Sign out</div>
        :
        <Link className="option" to="/signin">Sign in</Link>
      }
      <CartIcon />
    </div>
    {
      hidden ? "" : <CartDropdown />
    }
  </div>
)

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden
})

export default connect(mapStateToProps)(Header);