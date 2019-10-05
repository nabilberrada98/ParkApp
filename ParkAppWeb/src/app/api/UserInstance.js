import axios from "axios"
import { getItem, storeItem, updateItem, deleteItem} from "./axiosInstance";


// export const getAllMyLocals = () => {
//   console.log("[LocalInstance] -> getAllMyLocals() : ");
//   return getItem("/locals/me");
// }

export const getAllUsers = () => {
  return getItem("/api/users");
}

export const storeUser = (data) => {
  const uri = "/api/users/add";
  return storeItem(uri, data);
}

export const updateUser = (id, data) => {
  let uri = "/api/users/"+id;
  return updateItem(uri, data);
}

export const deleteUser = (id) => {
  const uri = "/api/users/"+id;
  return deleteItem(uri);
}