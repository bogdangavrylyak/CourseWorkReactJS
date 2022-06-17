import axios from "axios";
import { API_BASE } from "../services/constants";

export const getCharacteristic = async () => {
  try {
    const data = await axios.get(`${API_BASE}/characteristic`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(c => ({...c,
        CharacteristicRef: c.haracteristic_id
       }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createCharacteristic = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/characteristic`, data);
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

export const updateCharacteristic = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/characteristic/${id}`, data);
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

export const deleteCharacteristic = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/characteristic/${id}`);
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
