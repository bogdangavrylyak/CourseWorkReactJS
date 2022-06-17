import axios from "axios";
import { API_BASE } from "../services/constants";

export const getCompanySupplier = async () => {
  try {
    const data = await axios.get(`${API_BASE}/company-supplier`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(el => ({
        ...el,
        CompanySupplierRef: el.CompanySupplier_id,
      }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createCompanySupplier = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/company-supplier`, data);
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

export const updateCompanySupplier = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/company-supplier/${id}`, data);
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

export const deleteCompanySupplier = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/company-supplier/${id}`);
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
