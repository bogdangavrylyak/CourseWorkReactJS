import axios from "axios";
import { endsWith } from "lodash";
import { API_BASE } from "./constants";

export const getEmployee = async () => {
  try {
    const data = await axios.get(`${API_BASE}/employee`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map((el) => ({
        ...el,
        ...el.Position,
        ...el.Department,
      }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createEmployee = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/employee`, data);
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

export const updateEmployee = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/employee/${id}`, data);
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

export const deleteEmployee = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/employee/${id}`);
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
