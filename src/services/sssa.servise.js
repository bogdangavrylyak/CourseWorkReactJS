import axios from "axios";
import { API_BASE } from "./constants";

export const getSSSAList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/SSSA/list`);
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

export const createSSSA = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/SSSA`, data);
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

export const updateSSSA = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/SSSA/${id}`, data);
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

export const deleteSSSA = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/SSSA/${id}`);
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
