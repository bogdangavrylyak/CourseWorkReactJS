import axios from "axios";
import { API_BASE } from "./constants";

export const getClubList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/BasketClub/list`);
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

export const createClub = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/BasketClub`, data);
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

export const updateClub = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/BasketClub/${id}`, data);
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

export const deleteClub = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/BasketClub/${id}`);
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
