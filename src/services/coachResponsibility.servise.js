import axios from "axios";
import { API_BASE } from "./constants";

export const getCoachResponsibilityList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/CoachResponsibility/list`);
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

export const createCoachResponsibility = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/CoachResponsibility`, data);
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

export const updateCoachResponsibility = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/CoachResponsibility/${id}`, data);
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

export const deleteCoachResponsibility = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/CoachResponsibility/${id}`);
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
