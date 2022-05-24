import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/Login";
import Control from "./Pages/Control";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";

function App() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    console.log(currentUser);

    return (
        <>
            <Navbar />
            <Routes>
                <Route>
                    <Route path="/" element={<Home />} />

                    <Route
                        path={currentUser === null ? "/" : "/control"}
                        element={currentUser === null ? <Home /> : <Control />}
                    />

                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
