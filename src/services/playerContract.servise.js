import axios from "axios";
import { API_BASE } from "./constants";

export const getPlayerContractList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/PlayerContract/list`);
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

export const createPlayerContract = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/PlayerContract`, data);
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

export const updatePlayerContract = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/PlayerContract/${id}`, data);
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

export const deletePlayerContract = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/PlayerContract/${id}`);
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
