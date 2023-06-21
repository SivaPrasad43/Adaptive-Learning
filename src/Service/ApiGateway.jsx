import axios from "axios";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const ApiGateway = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json",
  },
});

export default ApiGateway;
