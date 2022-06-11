import axios from "axios";
import { API_BASE } from "./constants";

export const getNationalityList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/Nationality/list`);
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

export const createNationality = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/Nationality`, data);
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

export const updateNationality = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/Nationality/${id}`, data);
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

export const deleteNationality = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/Nationality/${id}`);
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
