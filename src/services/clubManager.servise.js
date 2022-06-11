import axios from "axios";
import { API_BASE } from "./constants";

export const getClubManagerList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/ClubManager/list`);
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

export const createClubManager = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/ClubManager`, data);
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

export const updateClubManager = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/ClubManager/${id}`, data);
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

export const deleteClubManager = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/ClubManager/${id}`);
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
