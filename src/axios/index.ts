import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lookee.nwhco.ir/aapi",
});

export default axiosInstance;
