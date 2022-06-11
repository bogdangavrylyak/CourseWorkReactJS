import axios from "axios";
import { API_BASE } from "./constants";

export const getOfficeRoleList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/OfficeRole/list`);
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

export const createOfficeRole = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/OfficeRole`, data);
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

export const updateOfficeRole = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/OfficeRole/${id}`, data);
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

export const deleteOfficeRole = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/OfficeRole/${id}`);
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
