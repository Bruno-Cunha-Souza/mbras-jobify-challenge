"use client";

import React, { useEffect, useState } from "react";
import CardVagas from "@/components/elements/CardVagas";
import { Input } from "../ui/input";
import { SelectCategory } from "@/components/elements/SelectCategory";
import Pagination from "@/components/elements/Pagination";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

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

const SectionVagas = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 250);

  const fetchJobs = async (searchQuery: string = "", categorySlug: string = "", page: number = 1) => {
    setLoading(true);
    try {
      let url = `http://localhost:3001/api/jobs?page=${page}`;
      if (searchQuery) {
        url = `http://localhost:3001/api/jobs/search?search=${searchQuery}&page=${page}`;
      }
      if (categorySlug) {
        url = `http://localhost:3001/api/jobs/search?search=${categorySlug}&page=${page}`;
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

  useEffect(() => {
    if (debouncedSearch === "" && category === "") {
      fetchJobs("", "", page);
    } else {
      fetchJobs(debouncedSearch, category, page);
    }
  }, [debouncedSearch, category, page]);

  return (
    <section>
      <div className="flex w-full gap-1">
        <Input type="text" placeholder="Pesquise por título, empresa..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <SelectCategory onCategoryChange={setCategory} />
      </div>

      <div className="container mx-auto py-4 px-5 max-h-[70vh] overflow-hidden overflow-y-auto">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <CardVagas
                key={job.id}
                url={job.url}
                company={job.company_name}
                logo={job.company_logo_url}
                title={job.title}
                description={job.description}
                data={new Date(job.publication_date).toLocaleDateString("pt-BR")}
                salary={job.salary || "Salário não informado"}
                job_tyme={job.job_type}
              />
            ))}
          </div>
        )}

        <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
      </div>
    </section>
  );
};

export default SectionVagas;
