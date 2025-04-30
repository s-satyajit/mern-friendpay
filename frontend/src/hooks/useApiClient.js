import { useState } from "react";
import axios from "axios";
import { get } from "http";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

const useApiClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (method = "GET", url, data = null, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    makeRequest,
  };
};

export default useApiClient;
