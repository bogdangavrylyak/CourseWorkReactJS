import axios from "axios";
import { API_BASE } from "../services/constants";

export const getCustomer = async () => {
  try {
    const data = await axios.get(`${API_BASE}/customer`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(el => ({ 
        ...el,
        CustomerRef: el.Customer_id,
      }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createCustomer = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/customer`, data);
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

export const updateCustomer = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/customer/${id}`, data);
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

export const deleteCustomer = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/customer/${id}`);
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
