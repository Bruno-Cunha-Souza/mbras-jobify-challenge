"use client";

import React, { useState } from "react";
import CardVagas from "@/components/elements/CardVagas";
import { Input } from "../ui/input";
import { SelectCategory } from "@/components/elements/SelectCategory";
import Pagination from "@/components/elements/Pagination";
import { useDebounce } from "../../hooks/useDebounce";
import { useJobs } from "../../hooks/useJobs";

const SectionVagas = () => {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 250);

  const { jobs, totalPages, loading } = useJobs(debouncedSearch, category, page);

  return (
    <section>
      <div className="flex w-full gap-1">
        <Input type="text" placeholder="Pesquise por título, empresa..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <SelectCategory onCategoryChange={setCategory} />
      </div>

      <div className="container mx-auto py-4 px-5 max-h-[80vh] overflow-hidden overflow-y-auto">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <CardVagas
                key={job.id}
                id={job.id}
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
