import axios from "axios";
import { API_BASE } from "../services/constants";

export const getContract = async () => {
  try {
    const data = await axios.get(`${API_BASE}/contract`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map((el) => ({
        ...el,
        ContractRef: el.Contract_id
      }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createContract = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/contract`, data);
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

export const updateContract = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/contract/${id}`, data);
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

export const deleteContract = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/contract/${id}`);
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
