import axios from "axios";
import { API_BASE } from "../services/constants";

export const auth = async (dt) => {
  try {
    const data = await axios.post(`${API_BASE}/employee/auth`, dt);
    console.log("response in service: ", data);
    console.log("dt: ", dt);
    if (data.status === 200 || data.status === 201) {
      const el = data.data;
      return {
        ...el,
        ...el.Position,
        ...el.Department,
      };
    } else {
      // return null;
      throw new Error(data);
    }
  } catch (e) {
    console.error(e);
    return null /*{ success: false, error: "Something went wrong" }*/;
  }
};
