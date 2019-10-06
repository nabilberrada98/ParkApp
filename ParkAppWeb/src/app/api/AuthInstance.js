import axios from "axios"
import { getItem, storeItem} from "./axiosInstance";


export const Login = (data) => {
    return storeItem("/api/auth/login", data);
}

export const Logout = () => {
    return getItem("/api/auth/logout");
}