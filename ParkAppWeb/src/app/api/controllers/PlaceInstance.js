import { getItem, storeItem, updateItem, deleteItem} from "../axiosInstance";

export const getRangePrices = () => {
  return getItem("/api/places/prix");
}

export const getUserLibelles = (id) => {
    return getItem("/api/users/localisations/"+id);
}

export const getAllPlaces = () => {
    return getItem("/api/places");
}

