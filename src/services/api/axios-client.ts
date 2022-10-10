import axios from "axios";

export function createAxiosClient() {
  return axios.create({
    baseURL: process.env.REACT_APP_COVID_API_URL,
    // due to free plan, the server goes to sleep after 15 minutes of inactivity
    timeout: 35000,
  });
}
