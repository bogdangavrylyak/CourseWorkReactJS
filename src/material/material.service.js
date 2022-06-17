import axios from "axios";
import { API_BASE } from "../services/constants";

export const getMaterial = async () => {
  try {
    const data = await axios.get(`${API_BASE}/material`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map((el) => ({
        ...el,
        MaterialRef: el.Material_id
      }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createMaterial = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/material`, data);
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

export const updateMaterial = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/material/${id}`, data);
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

export const deleteMaterial = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/material/${id}`);
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
