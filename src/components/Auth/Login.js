import React, { useState } from "react";
import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const { handleChange, handleSubmit, values } = useFormValidation(
    INITIAL_STATE
  );
  const [state, setState] = useState({
    login: true,
    name: "",
    password: "",
    email: ""
  });

  const { login } = state;
  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form className="flex flex-column" onSubmit={e => handleSubmit(e)}>
        {!login && (
          <input
            value={values.name}
            name="name"
            type="text"
            placeholder="Your name"
            autoComplete="off"
            onChange={e => handleChange(e)}
          />
        )}
        <input
          value={values.email}
          name="email"
          type="email"
          placeholder="Your email"
          autoComplete="off"
          onChange={e => handleChange(e)}
        />
        <input
          value={values.password}
          name="password"
          type="password"
          placeholder="Choose a password"
          autoComplete="off"
          onChange={e => handleChange(e)}
        />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
            Submit
          </button>
          <button
            type="button"
            className="button pointer"
            onClick={() =>
              setState(prevState => ({ ...state, login: !prevState.login }))
            }
          >
            {login ? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
