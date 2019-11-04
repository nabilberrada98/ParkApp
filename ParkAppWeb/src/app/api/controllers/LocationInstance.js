import { getItem, updateItem, deleteItem} from "../axiosInstance";
import { BASE_URL} from "../strings";
import axios from "axios";
export const getAllLocations = () => {
  return getItem("/api/locations");
}

export const getLocation = (id) => {
    return getItem("/api/locations/" + id);
}


export const storeLocation = (data) => {
  
  const uri = "/api/locations";
  const token = sessionStorage.getItem("token");
  return new Promise( async (resolve, reject) => {
    await axios({
            baseURL: BASE_URL,
            url : uri,
            method : "POST",
            data : data,
            headers: {
                'Content-Type': 'multipart/form-data charset=utf-8; boundary='+ Math.random().toString().substr(2),
                'x-access-token': token.replace(/(^"|"$)/g, '')
            }
        })
        .then(response => {
            resolve(response.data)
        })
        .catch(err => {
            console.log("erro : ",err);
            reject(err);
    });
  });

    //return storeItem(uri, "POST", data);
}

export const updateLocation = (id, data) => {
  let uri = "/api/locations/"+id;
  return updateItem(uri, data);
}

export const deleteLocation = (id) => {
  const uri = "/api/locations/"+id;
  return deleteItem(uri);
}
