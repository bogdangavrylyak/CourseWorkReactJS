import axios from "axios";
import { API_BASE } from "../services/constants";

export const getWorkProcess = async () => {
  try {
    const data = await axios.get(`${API_BASE}/work-process`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map((el) => ({
        ...el,
        WorkProcessRef: el.WorkProcess_id
      }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createWorkProcess = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/work-process`, data);
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

export const updateWorkProcess = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/work-process/${id}`, data);
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

export const deleteWorkProcess = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/work-process/${id}`);
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
