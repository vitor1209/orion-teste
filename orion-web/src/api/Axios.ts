import axios from "axios";
import { getDefaultStore } from "jotai";
import { authAtom } from "@/utils/Auth.atom";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
    (config) => {
        const authStorage = localStorage.getItem("auth")

        if (authStorage) {
            const auth = JSON.parse(authStorage)

            if (auth.access_token) {
                config.headers.Authorization = `Bearer ${auth.access_token}`
            }
        }

        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            getDefaultStore().set(authAtom, {
                usuario: null,
                access_token: null,
                token_type: null,
            })
        }

        return Promise.reject(error)
    }
)