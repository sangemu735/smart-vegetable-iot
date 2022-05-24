import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userAction";
import Error from "../components/Error";
import Loading from "../components/Loading";
import "./Login.css";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const loginstate = useSelector((state) => state.loginUserReducer);
    const { error, loading } = loginstate;
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            window.location.href = process.env.PUBLIC_URL;
        }
    }, []);

    const handleLogin = () => {
        const user = {
            userName: userName,
            password: password,
        };
        dispatch(loginUser(user));
    };

    return (
        <div className="login-container">
            {loading && <Loading />}
            {error && <Error error="Ivalid Credenticals" />}
            <h2>Welcome</h2>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter user name"
                    onChange={(e) => {
                        setUserName(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <div className="button-container">
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
