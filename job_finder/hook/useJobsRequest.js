import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/config";

export default function useJobsRequest() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jobs/`);
        setData(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { data, isLoading, error };
}
