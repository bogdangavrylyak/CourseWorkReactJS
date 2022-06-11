import axios from "axios";
import { API_BASE } from "./constants";

export const getTCSCList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/TCSC/list`);
    if (data.status === 200 || data.status === 201) {
      return data.data;
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createTCSC = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/TCSC`, data);
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

export const updateTCSC = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/TCSC/${id}`, data);
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

export const deleteTCSC = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/TCSC/${id}`);
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
