import axios from "axios";
import { API_BASE } from "./constants";

export const getSponsorAgreementList = async () => {
  try {
    const data = await axios.get(`${API_BASE}/SponsorAgreement/list`);
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

export const createSponsorAgreement = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/SponsorAgreement`, data);
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

export const updateSponsorAgreement = async (data, id) => {
  try {
    const res = await axios.put(`${API_BASE}/SponsorAgreement/${id}`, data);
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

export const deleteSponsorAgreement = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/SponsorAgreement/${id}`);
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
