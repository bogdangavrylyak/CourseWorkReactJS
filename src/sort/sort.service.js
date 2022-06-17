import axios from "axios";
import { API_BASE } from "../services/constants";

export const getSort = async () => {
  try {
    const data = await axios.get(`${API_BASE}/sort`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map(mt => ({...mt,
        SortRef: mt.Sort_id
       }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createSort = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/sort`, data);
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

export const updateSort = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/sort/${id}`, data);
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

export const deleteSort = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/sort/${id}`);
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
