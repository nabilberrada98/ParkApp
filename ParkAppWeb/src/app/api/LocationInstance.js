import { getItem, storeItem, updateItem, deleteItem} from "./axiosInstance";

export const getAllLocations = () => {
  return getItem("/api/locations");
}

export const getLocation = (id) => {
    return getItem("/api/locations/" + id);
}

export const storeLocation = (data) => {
  const uri = "/api/locations";
  return storeItem(uri, data);
}

export const updateLocation = (id, data) => {
  let uri = "/api/locations/"+id;
  return updateItem(uri, data);
}

export const deleteLocation = (id) => {
  const uri = "/api/locations/"+id;
  return deleteItem(uri);
}
