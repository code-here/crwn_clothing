import React from 'react';

import './signInAndSignUp.style.scss';
import SignIn from '../../components/sign-in/SignIn.component';
import SignUp from '../../components/sign-up/sign-up.components';

const SignInAndSignUp = () => (
  <div className="sign-in-and-sign-up">
    <SignIn />
    <SignUp />
  </div>
)
export default SignInAndSignUp;