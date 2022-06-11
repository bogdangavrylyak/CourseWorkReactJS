import axios from "axios";
import { API_BASE } from "./constants";

export const getLeagueList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/League/list`);
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

export const createLeague = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/League`, data);
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

export const updateLeague = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/League/${id}`, data);
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

export const deleteLeague = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/League/${id}`);
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
