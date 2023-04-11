import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  let history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/app/all')
    }
  };

  return (
    <div className="grid-1-1">
      <div className="bg-blue-fcc"></div>
      <div>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className="flx-col flx-wrap flx-ac-center gap15p">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />


          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />

          <button type="submit" className="bg-blue-dff color-white border-0 pad-tb-10p fontS-115rem">
            Log In
          </button>
          <button
            type='submit'
            onClick={() => {
              setEmail('demo@aa.io');
              setPassword('password');
            }}
            className="bg-blue-dff color-white border-0 pad-tb-10p fontS-115rem">
              Log in as Demo User
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
