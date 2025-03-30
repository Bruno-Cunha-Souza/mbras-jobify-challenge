import { useState, useEffect } from "react";

interface Job {
  id: number;
  company_name: string;
  company_logo_url?: string;
  title: string;
  publication_date: string;
  description: string;
  salary?: string;
  job_type: string;
  url: string;
}

export const useJobs = (searchQuery: string, categorySlug: string, page: number) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/jobs?page=${page}`;
        if (searchQuery) {
          url = `http://localhost:5000/api/jobs/search?search=${searchQuery}&page=${page}`;
        }
        if (categorySlug) {
          url = `http://localhost:5000/api/jobs/search?search=${categorySlug}&page=${page}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setJobs(data.jobs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchQuery, categorySlug, page]);

  return { jobs, totalPages, loading };
};