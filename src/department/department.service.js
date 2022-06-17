import axios from "axios";
import { API_BASE } from "../services/constants";

export const getDepartment = async () => {
  try {
    const data = await axios.get(`${API_BASE}/department`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(d => ({...d,
        ...d.Address,
         DepartmentRef: d.Department_id
        }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createDepartment = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/department`, data);
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

export const updateDepartment = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/department/${id}`, data);
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

export const deleteDepartment = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/department/${id}`);
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
