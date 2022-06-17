import axios from "axios";
import { API_BASE } from "../services/constants";

export const getLandscapeWork = async () => {
  try {
    const data = await axios.get(`${API_BASE}/landscapework`);
    if (data.status === 200 || data.status === 201) {
      return data.data.map((el) => ({
        ...el,
        LandscapeWorkRef: el.LandscapeWork_id,
      }));
    } else {
      throw new Error(data.statusText);
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const createLandscapeWork = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/landscapework`, data);
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

export const updateLandscapeWork = async (data, id) => {
  try {
    const res = await axios.patch(`${API_BASE}/landscapework/${id}`, data);
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

export const deleteLandscapeWork = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/landscapework/${id}`);
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
