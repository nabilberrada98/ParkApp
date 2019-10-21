import { userLogout, userLogin, getItem } from "../axiosInstance";


export const Login = (data) => {
    return userLogin("/api/auth/login", data);
}

export const Logout = () => {
    return userLogout("/api/auth/logout");
}

export const accessToken = () => {
    return getItem("/api/auth/access-token");
}