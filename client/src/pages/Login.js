import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

// This page is the login page. It uses the LOGIN_USER mutation to login a user.
const Login = () => {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { email: formState.email, password: formState.password },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.log(e);
        }

        setFormState({
            email: '',
            password: '',
          });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <main className="flex-row justify-center mb-4">
          <div className="col-12 col-lg-10">
            <div className="card">
              <h4 className="card-header p-2" style={{backgroundColor: "var(--marian-blue)", color: "var(--light-cyan)"}}>Login</h4>
              <div className="card-body">
                {data ? (
                  <p>
                    Success! You may now head{' '}
                    <Link to="/">back to the homepage.</Link>
                  </p>
                ) : (
                  <form className="login-form" onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <input
                        className="form-input"
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        className="form-input"
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                        />
                    </div>
                    <button
                      className="btn btn-block btn-primary"
                      style={{ cursor: 'pointer', 
                               fontSize: '1.2rem',
                               fontWeight: 'bold', 
                               color: "var(--light-cyan)", 
                               backgroundColor: "var(--marian-blue)" }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                )}
    
                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      );
    };

    
export default Login;
    