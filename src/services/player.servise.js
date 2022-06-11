import axios from "axios";
import { API_BASE } from "./constants";

export const getPlayerList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/Player/list`);
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

export const createPlayer = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/Player`, data);
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

export const updatePlayer = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/Player/${id}`, data);
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

export const deletePlayer = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/Player/${id}`);
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
