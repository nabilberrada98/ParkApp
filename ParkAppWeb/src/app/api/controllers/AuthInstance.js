import { userLogout, userLogin} from "../axiosInstance";


export const Login = (data) => {
    return userLogin("/api/auth/login", data);
}

export const Logout = () => {
    return userLogout("/api/auth/logout");
}