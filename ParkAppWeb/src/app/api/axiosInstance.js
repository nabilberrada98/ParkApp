import axios from "axios"
import {ACCESS_TOKEN} from "./strings";

export const getHeaders = (uri, method, data = {}) => {
  console.log("[AxiosInstance] -> getHeaders() : ");
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvbG9naW4iLCJpYXQiOjE1NjAxNTkxNzgsImV4cCI6MTU2MTY3MTE3OCwibmJmIjoxNTYwMTU5MTc4LCJqdGkiOiJxZWt3RHQzeWhFOTR2SW1jIn0.kc5cvKCuYit_ri276zu0myf_BtbyWWSHaIEy9CAlDWo";
  const handleData = (data !== null && Object.keys(data).length > 1) ? data : {} ;
  console.log("handleData : ", handleData);
  return {
    url: uri,
    method: method,
    data: handleData,
    headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
    }
  };
};


export const PromiseHandler = (method, uri, data = {}) => {
  return new Promise( async (resolve, reject) => {
    await axios(getHeaders(uri, method, data))
    .then(response => resolve(response.data) )
    .then( res  => console.log("response : ",res.data))
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
  return PromiseHandler("POST", uri, data);
}

export const deleteItem = (uri) => {
  return PromiseHandler("DELETE", uri);
}

