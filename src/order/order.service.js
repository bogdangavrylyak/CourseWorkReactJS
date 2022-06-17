import axios from "axios";
import { API_BASE } from "../services/constants";

export const getOrder = async () => {
  try {
    const data = await axios.get(`${API_BASE}/order`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(el => ({
        ...el,
        OrderRef: el.Order_id,
      }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createOrder = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/order`, data);
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

export const updateOrder = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/order/${id}`, data);
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

export const deleteOrder = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/order/${id}`);
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
