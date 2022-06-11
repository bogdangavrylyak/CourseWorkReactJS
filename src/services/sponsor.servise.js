import axios from "axios";
import { API_BASE } from "./constants";

export const getSponsorList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/Sponsor/list`);
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

export const createSponsor = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/Sponsor`, data);
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

export const updateSponsor = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/Sponsor/${id}`, data);
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

export const deleteSponsor = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/Sponsor/${id}`);
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
