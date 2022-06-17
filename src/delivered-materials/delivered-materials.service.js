import axios from "axios";
import { API_BASE } from "../services/constants";

export const getDeliveredMaterials = async () => {
  try {
    const data = await axios.get(`${API_BASE}/delivered-materials`);
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

export const createDeliveredMaterials = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/delivered-materials`, data);
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

export const updateDeliveredMaterials = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/delivered-materials/${id}`, data);
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

export const deleteDeliveredMaterials = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/delivered-materials/${id}`);
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
