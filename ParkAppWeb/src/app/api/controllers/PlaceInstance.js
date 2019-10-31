import { getItem, storeItem, updateItem, deleteItem} from "../axiosInstance";

export const getRangePrices = () => {
  return getItem("/api/places/prix");
}

export const getUserAddressTxt = (id) => {
    return getItem("/api/users/localisations/"+id);
}
