import axios from "axios";
import { API_BASE } from "../services/constants";

export const getAddressList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/address`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(d => ({...d,
         AddressRef: d.Address_id
        }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createAddress = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/address`, data);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const updateAddress = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/address/${id}`, data);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const deleteAddress = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/address/${id}`);
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
    return {};
  }
};
