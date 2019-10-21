import { getItem, updateItem, deleteItem} from "../axiosInstance";
import { BASE_URL} from "../strings";
import axios from "axios";
export const getAllLocations = () => {
  return getItem("/api/locations");
}

export const getLocation = (id) => {
    return getItem("/api/locations/" + id);
}

export const storeLocation = (data,files) => {
  console.log( { data,files });
  const uri = "/api/locations";
  // const formData = new FormData();
  // formData.set("files", files);
  // formData.set("data", data);
  const token = sessionStorage.getItem("token");
  return new Promise( async (resolve, reject) => {
    await axios({
      baseURL: BASE_URL,
      url : uri,
      method : "POST",
      data : {data ,files },
      headers: {
          'Content-Type': 'application/json',
          'x-access-token': token.replace(/(^"|"$)/g, '')
      }
    })
    .then(response =>{
      console.log("response : ",response.data);
      resolve(response.data)
    })
    .catch(err => {
      console.log("erro : ",err);
      reject(err);
    });
  });
  //return storeItem(uri,"POST", data);
}

export const updateLocation = (id, data) => {
  let uri = "/api/locations/"+id;
  return updateItem(uri, data);
}

export const deleteLocation = (id) => {
  const uri = "/api/locations/"+id;
  return deleteItem(uri);
}
