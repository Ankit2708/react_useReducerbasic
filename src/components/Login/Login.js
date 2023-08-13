import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action)=>{
  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.includes('@')}
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value.includes('@')}
  }
  return {value:'', isValid:false}
}
const passwordReducer = (state, action) =>{
  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.trim().length > 6}
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value.trim().length > 6}
  }
  return {value:'', isValid:false}
}
/**
 use cases for useState and useReducer
 usestate can be used when we have simple state change and is main state mechanism
 usestate is great when we have independent state management
 useReducer can be used when we have multiple states which depend on each other
 */
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  /**
   // usereducer takes 3 parameters reducer fn, initial state, initial fn
   */
  const [emailState, emaildispatchfn] = useReducer(emailReducer, {value:'',isValid:null })  
  const [passwordState, passworddispatch] = useReducer(passwordReducer, {value:'', isValid:null})
  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);
  const {isValid:emailStateIsValid} = emailState // not assigning new value but making an alias
  const {isValid:passwordStateIsValid} = passwordState
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        // enteredEmail.includes('@') && enteredPassword.trim().length > 6
        emailStateIsValid && passwordStateIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailStateIsValid, passwordStateIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    emaildispatchfn({type:'USER_INPUT', val:event.target.value})

    // setFormIsValid(
    //   // event.target.value.includes('@') && enteredPassword.trim().length > 6
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    passworddispatch({type:'USER_INPUT', val:event.target.value})

    // setFormIsValid(
    //   // enteredEmail.includes('@') && event.target.value.trim().length > 6
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    emaildispatchfn({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    passworddispatch({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            // emailIsValid === false ? classes.invalid : ''
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            // value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            // passwordIsValid === false ? classes.invalid : ''
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
