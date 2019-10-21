import axios from "axios"
import { BASE_URL} from "./strings";

export const getHeaders = (uri, method, data = {}) => {
  console.log("[AxiosInstance] -> getHeaders() : ");
  const token = sessionStorage.getItem("token");
  const handleData = (data !== null && Object.keys(data).length > 1) ? data : {} ;
  console.log("handleData : ", handleData);
  return {
    baseURL: BASE_URL,
    url: uri,
    method: method,
    data: handleData,
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': token.replace(/(^"|"$)/g, '')
    }
  };
};

export const getCustomHeader = (uri, method, data = {}) => {
    console.log("[AxiosInstance] -> getCustomHeader() : ");
    const handleData = (data !== null && Object.keys(data).length > 1) ? data : {} ;
    return {
      url: uri,
      baseURL: BASE_URL,
      method: method,
      data: handleData,
      headers: {
          'Content-Type': 'application/json'
      }
    };
};


export const PromiseHandler = (method, uri, data = {}, isAuth = false) => {
    const header = isAuth ? getCustomHeader(uri, method, data) : getHeaders(uri, method, data);
    return new Promise( async (resolve, reject) => {
    await axios(header)
        .then(response => resolve(response.data) )
        .then( res  => console.log("response : ", res.data))
        .catch(err => reject(err))
    });
}

export const getItem = (uri) => {
  return PromiseHandler("GET", uri);
}

export const storeItem = (uri, data) => {
  return PromiseHandler("POST", uri, data);
}

export const updateItem = (uri, data) => {
  return PromiseHandler("PUT", uri, data);
}

export const deleteItem = (uri) => {
  return PromiseHandler("DELETE", uri);
}

export const userLogin = (uri, data) => {
    return PromiseHandler("POST", uri, data, true);
}

export const userLogout = (uri) => {
    return PromiseHandler("GET", uri);
}