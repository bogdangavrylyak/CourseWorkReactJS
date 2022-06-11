import axios from "axios";
import { API_BASE } from "./constants";

export const getTrainerList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/Trainer/list`);
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

export const getTrainerStats = async () => {
  try {
    const data = await axios.get(`${API_BASE}/Trainer/stats`);
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

export const createTrainer = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/Trainer`, data);
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

export const updateTrainer = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/Trainer/${id}`, data);
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

export const deleteTrainer = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/Trainer/${id}`);
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
