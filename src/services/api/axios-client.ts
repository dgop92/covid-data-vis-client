import axios from "axios";

export function createAxiosClient() {
  return axios.create({
    baseURL: process.env.REACT_APP_COVID_API_URL,
    timeout: 5000,
  });
}
