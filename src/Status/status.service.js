import axios from "axios";
import { API_BASE } from "../services/constants";

export const getStatus = async () => {
  try {
    const data = await axios.get(`${API_BASE}/status`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(mt => ({...mt,
        StatusRef: mt.Status_id
       }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createStatus = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/status`, data);
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

export const updateStatus = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/status/${id}`, data);
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

export const deleteStatus = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/status/${id}`);
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
