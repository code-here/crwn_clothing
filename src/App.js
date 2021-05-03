import './App.css';
import Homepage from './pages/homepage/Homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop-page/ShopPage.component';
import Header from './components/header/Header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/signInAndSignUp.component';
import { auth } from './firebase/firebase.utils';
import React from 'react';

class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp}/>
        </Switch>
      </div>
    );
  }
}

export default App;
