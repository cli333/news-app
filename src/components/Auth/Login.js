import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";

import firebase from "../../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const {
    handleChange,
    handleSubmit,
    values,
    handleBlur,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);

  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  async function authenticateUser() {
    const { email, password, name } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
    } catch (error) {
      setFirebaseError(error.message);
    }
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form className="flex flex-column" onSubmit={e => handleSubmit(e)}>
        {!login && (
          <input
            onBlur={() => handleBlur()}
            value={values.name}
            name="name"
            type="text"
            placeholder="Your name"
            autoComplete="off"
            onChange={e => handleChange(e)}
          />
        )}
        <input
          className={errors.email && "error-input"}
          onBlur={() => handleBlur()}
          value={values.email}
          name="email"
          type="email"
          placeholder="Your email"
          autoComplete="off"
          onChange={e => handleChange(e)}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          className={errors.password && "error-input"}
          onBlur={() => handleBlur()}
          value={values.password}
          name="password"
          type="password"
          placeholder="Choose a password"
          autoComplete="off"
          onChange={e => handleChange(e)}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{
              background: isSubmitting ? "grey" : "orange"
            }}
          >
            Submit
          </button>
          <button
            type="button"
            className="button pointer"
            onClick={() => setLogin(prevState => !prevState)}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
