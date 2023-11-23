import axios from "axios";

const getAccessToken = async (user) => {
    const requestData = {
        name: user?.name,
        email: user?.email
    };

    const apiUrl = `${process.env.NEXT_PUBLIC_API_ROOT}/api/v1/auth/sso-login/`;

    const accessToken = await axios.post(apiUrl, requestData, {
        headers: {
            "Accept": "application/json",
        },
    }).then((res) => res.data.data.access_token);
    localStorage.setItem("accessToken", accessToken);
};

export default getAccessToken;
