import axios from "axios";
import { API_BASE } from "../services/constants";

export const getCityList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/city`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(d => ({...d, CityRef: d.City_id}));
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
    const res = await axios.post(`${API_BASE}/city`, data);
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
    const res = await axios.patch(`${API_BASE}/city/${id}`, data);
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
    const res = await axios.delete(`${API_BASE}/city/${id}`);
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
