import React, { useRef, FormEvent, useState } from "react";
import "./login.page.scss";
import { api } from "../../lib/API";
import { Redirect } from "react-router";

export const LoginPage = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const login = async (e: FormEvent) => {
    e.preventDefault();

    // to reset the error for multiple logins...
    setError(false);

    const emailId = email.current!.value;
    const pass = password.current!.value;
    const loginCredentials = await api.login(emailId, pass);

    // Display error if we don't receive token from backend...
    if (!loginCredentials) setError(true);

    // else if toekn received then...
    setLoggedIn(true);
    localStorage.setItem("token", loginCredentials.token);
  };

  // If token available then redirect...
  if (loggedIn) return <Redirect to="/"></Redirect>;

  return (
    <main className="login">
      {/* <h1>Login page</h1> */}
      <form className="login-form" onSubmit={login}>
        <div>
          <h1 className="login-form-header">Chat App</h1>

          {/* If incorrect login details then display error message... */}
          {error && <span className="error">Incorrect login details</span>}

          <input
            ref={email}
            className="login-form-email"
            type="text"
            name="email"
            placeholder="Email"
          ></input>
          <input
            ref={password}
            className="login-form-password"
            type="password"
            name="email"
            placeholder="Password"
          ></input>
          <button className="login-form-btn">Login</button>
        </div>
      </form>
    </main>
  );
};
