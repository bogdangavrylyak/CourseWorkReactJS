import axios from "axios";
import { API_BASE } from "./constants";

export const getWorkHistoryList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/WorkHistory/list`);
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

export const createWorkHistory = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/WorkHistory`, data);
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

export const updateWorkHistory = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/WorkHistory/${id}`, data);
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

export const deleteWorkHistory = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/WorkHistory/${id}`);
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
