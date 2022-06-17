import axios from "axios";
import { API_BASE } from "../services/constants";

export const getWorkProcessEmployee = async () => {
  try {
    const data = await axios.get(`${API_BASE}/work-process-employee`);
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

export const createWorkProcessEmployee = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/work-process-employee`, data);
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

export const updateWorkProcessEmployee = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/work-process-employee/${id}`, data);
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

export const deleteWorkProcessEmployee = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/work-process-employee/${id}`);
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
