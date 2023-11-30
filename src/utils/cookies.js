import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const setUserCookies = async (user) => {
    const requestData = {
        name: user?.name,
        email: user?.email
    };

    const apiUrl = `${process.env.NEXT_PUBLIC_API_ROOT}/api/v1/auth/sso-login/`;

    await axios.post(apiUrl, requestData, {
        headers: {
            "Accept": "application/json",
        },
    }).then((res) => {
        const accessToken = res.data.data.access_token;
        const decodedToken = jwtDecode(accessToken);

        // // Set the token in a cookie with an expiration time
        Cookies.set("accessToken", accessToken, {
            expires: new Date(decodedToken.exp * 1000), // Convert expiration time to milliseconds
        });

        // // Set provider status and user ID in cookies or wherever needed
        Cookies.set("isProvider", decodedToken.is_provider);
        Cookies.set("userId", decodedToken.user_id);
    });
};

// Function to clear all cookies
export const clearAllCookies = () => {
    const allCookies = Cookies.get();

    Object.keys(allCookies).forEach(cookieName => {
        Cookies.remove(cookieName);
    });

    console.log("All cookies cleared.");
};


export const getAccessToken = () => Cookies.get("accessToken");

export const getIsProvider = () => Cookies.get("isProvider");

export const getAllCookies = () => Cookies.get();
