import axios from "axios";
import { API_BASE } from "../services/constants";

export const getMaterialType = async () => {
  try {
    const data = await axios.get(`${API_BASE}/material-type`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(mt => ({...mt,
        MaterialTypeRef: mt.MaterialType_id
       }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createMaterialType = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/material-type`, data);
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

export const updateMaterialType = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/material-type/${id}`, data);
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

export const deleteMaterialType = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/material-type/${id}`);
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
