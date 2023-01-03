import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useReducer,
} from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/context/UserContext";
import styled from "styled-components";
import RegisterStyle from "../lib/components/elements/registrationLoginStyle";
import { getCookie, sendCookie } from "../functions/userFunctions";
import Cookies from 'universal-cookie';



function Login({ className }: { className?: string }) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loggedUser, setLoggedUser] = useState("");
  const [errors, setErrors] = useState<[] | { message: "" }[]>([]);
  const [isShowPassword, setisShowPassword] = useState(false);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const userInfoUrl = `${process.env.REACT_APP_API}/api/user-info`;

  function login() {
    if (process.env.REACT_APP_ENV===undefined) {
        Axios.post(
            `${process.env.REACT_APP_API}/api/login`,
            {
              username: usernameRef.current?.value || "",
              password: passwordRef.current?.value || "",
            },
            { withCredentials: true }
          ).then((res)=>{
            sendCookie(userContext)
          }).then(()=>{
              navigate("/feed");
            })
            .catch((err) => {
              if (Array.isArray(err.response.data[0])) {
                setErrors(err.response.data[0]);
              } else {
                setErrors([err.response.data[0]]);
              }
            });
    } else if (process.env.REACT_APP_ENV==='prodcution') {
        Axios.post(
            `${process.env.REACT_APP_API}/api/loginNoAuth`,
            {
              username: usernameRef.current?.value || "",
              password: passwordRef.current?.value || "",
            },
            { withCredentials: true }
          ).then((res)=>{
            userContext.updateUser(res)
          }).then(()=>{
              navigate("/feed");
            })
            .catch((err) => {
              if (Array.isArray(err.response.data[0])) {
                setErrors(err.response.data[0]);
              } else {
                setErrors([err.response.data[0]]);
              }
            });
    }
  }

  return (
    <RegisterStyle page="login">
      <div className={className}>
        <h1>Login</h1>
        <div className="username__container">
          <label>Username</label>
          <input className="name__input" type="text" ref={usernameRef} />
        </div>

        <div className="password__container">
          <label>Password</label>
          <div className="password__row">
            <input
              className="password"
              type={isShowPassword ? "text" : "password"}
              ref={passwordRef}
            />
            <button
              className="hide"
              onClick={() => setisShowPassword(!isShowPassword)}
            >
              hide
            </button>
          </div>
        </div>

        <button className="submit" onClick={login}>
          Login
        </button>
        {errors && (
          <div>
            {errors.map((err: { message: any }) => {
              return <p>{err.message}</p>;
            })}
          </div>
        )}
        {loggedUser && <h1>{loggedUser}</h1>}
      </div>
    </RegisterStyle>
  );
}

export default styled(Login)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  text-align: center;
  width: 100%;
  max-width: 300px;
  gap: 1em;

  .password__row {
    display: flex;
    width: 100%;
  }

  .username__container,
  .password__container {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  input.password {
    flex-grow: 1;
    min-width: 20px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #333333;
  }

  .name__input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #333333;
  }

  .hide {
    min-width: 20px;
    border-radius: 8px;
    margin: 0 0 0 10px;
    border: 1px solid #333333;
    padding: 10px;
  }

  .submit {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #333333;
    width: 100%;
    display: block;
    background-color: #d475d4;
  }
`;
