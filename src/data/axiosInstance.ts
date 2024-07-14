import axios from "axios";

const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWZlZjZjMTUyMTZhMGE2OTNlMjI1Y2EzMjIzZjM0ZSIsIm5iZiI6MTcyMDk2MDA3Mi40MzU4NzgsInN1YiI6IjVmYzY2ZDI3M2EzNDBiMDAzZWUyOGUxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNUkzwYObNT3y8bINTCJyUcrPfw0VeEufiPJ_QwhAZM";
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export default axiosInstance;
