import axios from "axios";
import { API_BASE } from "./constants";

export const getSpecialConditionList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/SpecialCondition/list`);
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

export const createSpecialCondition = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/SpecialCondition`, data);
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

export const updateSpecialCondition = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/SpecialCondition/${id}`, data);
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

export const deleteSpecialCondition = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/SpecialCondition/${id}`);
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
