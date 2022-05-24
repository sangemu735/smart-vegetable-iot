import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userAction";
import "./Navbar.css";

const logo = "images/logo.png";

const Navbar = () => {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const dispatch = useDispatch();

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <img src={logo} alt="Logo PTIT" width="80rem" />
                    </Link>
                    <Link to="/control">Control</Link>
                    {currentUser ? (
                        <Link
                            to="#"
                            onClick={() => {
                                dispatch(logoutUser());
                            }}
                        >
                            Logout
                        </Link>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
