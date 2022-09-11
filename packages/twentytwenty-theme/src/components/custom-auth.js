/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

/* Create the form state and form input state */
let formState = "signUp";
let formInputState = {name: '', username: '', password: '', email: '', verificationCode: '' };

/* onChange handler for form inputs */
function onChange(e) {
  formInputState = { ...formInputState, [e.target.name]: e.target.value };
}

/* Sign up function */
async function signUp() {
  try {
    await Auth.signUp({
      username: formInputState.username,
      password: formInputState.password,
      attributes: {
        email: formInputState.email,
        name: formInputState.name
      }});
    /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
    formState = "confirmSignUp";
  } catch (err) { console.log({ err }); }
}

/* Confirm sign up function for MFA */
async function confirmSignUp() {
  try {
    await Auth.confirmSignUp(formInputState.username, formInputState.verificationCode);
    /* Once the user successfully confirms their account, update form state to show the sign in form*/
    formState = "signIn";
  } catch (err) { console.log({ err }); }
}

/* Sign in function */
async function signIn() {
  try {
    await Auth.signIn(formInputState.username, formInputState.password);
    /* Once the user successfully signs in, update the form state to show the signed in state */
    formState = "signedIn";
  } catch (err) { console.log({ err }); }
}

const CustomAuth = () => {
/* In the UI of the app, render forms based on form state */
/* If the form state is "signUp", show the sign up form */
if (formState === "signUp") {
  return (
    <div>
      <input
        name="username"
        onChange={onChange}
      />
      <input
        name="password"
        type="password"
        onChange={onChange}
      />
      <input
        name="email"
        onChange={onChange}
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  )
}

/* If the form state is "confirmSignUp", show the confirm sign up form */
if (formState === "confirmSignUp") {
  return (
    <div>
      <input
        name="username"
        onChange={onChange}
      />
      <input
        name="verificationCode"
        onChange={onChange}
      />
      <button onClick={confirmSignUp}>Confirm Sign Up</button>
    </div>
  )
}

/* If the form state is "signIn", show the sign in form */
if (formState === "signIn") {
  return (
    <div>
      <input
        name="username"
        onChange={onChange}
      />
      <input
        name="password"
        onChange={onChange}
      />
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}

/* If the form state is "signedIn", show the app */
if (formState === "signedIn") {
  return (
    <div>
      <h1>Welcome to my app!</h1>
    </div>
  )
}
};

export default CustomAuth;