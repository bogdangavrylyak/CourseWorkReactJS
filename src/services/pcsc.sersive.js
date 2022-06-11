import axios from "axios";
import { API_BASE } from "./constants";

export const getPCSCList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/PCSC/list`);
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

export const createPCSC = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/PCSC`, data);
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

export const updatePCSC = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/PCSC/${id}`, data);
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

export const deletePCSC = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/PCSC/${id}`);
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
