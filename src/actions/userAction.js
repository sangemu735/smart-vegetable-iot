import axios from "axios";

export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    try {
        const response = await axios.post("https://smart-vegetable.herokuapp.com/login", user);
        console.log(response);
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        window.location.href = process.env.PUBLIC_URL + "/control";
    } catch (error) {
        dispatch({ type: "USER_LOGIN_FAILED", payload: error });
    }
};

export const logoutUser = (user) => (dispatch) => {
    localStorage.removeItem("currentUser");
    window.location.href = process.env.PUBLIC_URL + "/login";
};
