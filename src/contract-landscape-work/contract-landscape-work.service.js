import axios from "axios";
import { API_BASE } from "../services/constants";

export const getContractLandscapeWork = async () => {
  try {
    const data = await axios.get(`${API_BASE}/contract-landscape-work`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(el => ({
        ...el,
        ...el.Contract,
        ContractLandscapeWorkRef: el.ContractLandscapeWork_id,
      }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createContractLandscapeWork = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/contract-landscape-work`, data);
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

export const updateContractLandscapeWork = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/contract-landscape-work/${id}`, data);
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

export const deleteContractLandscapeWork = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/contract-landscape-work/${id}`);
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
