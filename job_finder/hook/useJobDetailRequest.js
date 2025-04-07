import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/config";

export default function useRequest(endpoint, params = {}) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(params)
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}/${params.job_id}/`);
      setData(response.data); // Or response.data.results depending on your API
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, JSON.stringify(params)]); // re-run when params change

  return { data, isLoading, error, refetch: fetchData };
}
