import axios from "axios";

const baseAPI = axios.create({
  baseURL: "https://elearningnew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2MCIsIkhldEhhblN0cmluZyI6IjE4LzA4LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcyMzkzOTIwMDAwMCIsIm5iZiI6MTY5NDM2NTIwMCwiZXhwIjoxNzI0MDg2ODAwfQ.zVOvKMLttbVlutbb-QZ7FHPTdL-8JAIw50y_zo_SJ6w",
  },
});

baseAPI.interceptors.request.use(
  (request) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      request.headers.Authorization = `Bearer ${currentUser.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

baseAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response.status === 401) {
      localStorage.removeItem("currentUser");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default baseAPI;
