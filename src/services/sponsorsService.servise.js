import axios from "axios";
import { API_BASE } from "./constants";

export const getSponsorsServiceList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/SponsorsService/list`);
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

export const createSponsorsService = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/SponsorsService`, data);
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

export const updateSponsorsService = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/SponsorsService/${id}`, data);
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

export const deleteSponsorsService = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/SponsorsService/${id}`);
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
