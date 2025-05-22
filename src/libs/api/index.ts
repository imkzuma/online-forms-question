import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const UNPROTECTED_ROUTES = ["/auth/login"];

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { endpoint }) => {
    const isUnprotected = UNPROTECTED_ROUTES.includes(endpoint);
    if (!isUnprotected) {
      const user = localStorage.getItem("user");

      if (user) {
        const token = JSON.parse(user).accessToken;
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});
