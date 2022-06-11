import axios from "axios";
import { API_BASE } from "./constants";

export const getTransferHistoryList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/TransferHistory/list`);
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

export const createTransferHistory = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/TransferHistory`, data);
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

export const updateTransferHistory = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/TransferHistory/${id}`, data);
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

export const deleteTransferHistory = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/TransferHistory/${id}`);
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
