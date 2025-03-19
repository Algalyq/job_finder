import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import api from '../utils/api';

export default function useAuthRequest(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.request({
        url: endpoint,
        method: options.method || 'GET',
        data: options.data,
        params: options.params,
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      // If unauthorized and not already on auth page, redirect to login
      if (err.response?.status === 401) {
        router.replace('/auth/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, JSON.stringify(options)]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
}
