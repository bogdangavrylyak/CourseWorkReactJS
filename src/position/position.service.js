import axios from "axios";
import { API_BASE } from "../services/constants";

export const getPosition = async () => {
  try {
    const data = await axios.get(`${API_BASE}/position`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(p => ({...p, PositionRef: p.Position_id}));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createPosition = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/position`, data);
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

export const updatePosition = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/position/${id}`, data);
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

export const deletePosition = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/position/${id}`);
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
