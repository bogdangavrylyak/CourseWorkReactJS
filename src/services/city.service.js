import axios from "axios";
import { API_BASE } from "./constants";

export const getCityList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/City/list`);
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

export const createCity = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/City`, data);
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

export const updateCity = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/City/${id}`, data);
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

export const deleteCity = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/City/${id}`);
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
