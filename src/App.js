import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Homepage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop-page/ShopPage.component';
import CheckoutPage from './pages/checkout/checkout.componet';
import Header from './components/header/Header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/signInAndSignUp.component';
import { checkUserSession } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selector';

const App = ({ currentUser, checkUserSession }) => {
  
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route path="/signin" render={
          () => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUp />)
        }/>
      </Switch>
    </div>
  );

}

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
