import { getItem, storeItem, updateItem, deleteItem} from "../axiosInstance";

export const getAllReservations = () => {
  return getItem("/api/reservations");
}

export const getReservation = (id) => {
    return getItem("/api/reservations/" + id);
}

export const storeReservation = (data) => {
  const uri = "/api/reservations";
  return storeItem(uri, data);
}

export const updateReservation = (id, data) => {
  let uri = "/api/reservations/"+id;
  return updateItem(uri, data);
}

export const deleteReservation = (id) => {
  const uri = "/api/reservations/"+id;
  return deleteItem(uri);
}
