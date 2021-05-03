import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './sign-up.style.scss';

class signUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if(password !== confirmPassword) {
      alert("password and confirm password don't match");
      return;
    }
    
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch(err) {
      console.log(`error occured during sign up: ${err}`);
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with an email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            label="Display Name"
            value={displayName}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type="email"
            name="email"
            label="Email"
            value={email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            name="password"
            label="Password"
            value={password}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm password"
            value={confirmPassword}
            handleChange={this.handleChange}
            required
          />
          <CustomButton type="submit" >
            Sign Up
          </CustomButton>
        </form>
      </div>
    )
  }
}

export default signUp;