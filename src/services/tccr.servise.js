import axios from "axios";
import { API_BASE } from "./constants";

export const getTCCRList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/TCCR/list`);
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

export const createTCCR = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/TCCR`, data);
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

export const updateTCCR = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/TCCR/${id}`, data);
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

export const deleteTCCR = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/TCCR/${id}`);
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
