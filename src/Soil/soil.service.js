import axios from "axios";
import { API_BASE } from "../services/constants";

export const getSoil = async () => {
  try {
    const data = await axios.get(`${API_BASE}/soil`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(c => ({...c,
        SoilRef: c.Soil_id,
       }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createSoil = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/soil`, data);
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

export const updateSoil = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/soil/${id}`, data);
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

export const deleteSoil = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/soil/${id}`);
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
