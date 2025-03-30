import { createContext, useContext, ReactNode } from "react";
import { useJobs } from "../hooks/useJobs";

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

interface JobsContextType {
  jobs: Job[];
  totalPages: number;
  loading: boolean;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider = ({
  searchQuery,
  categorySlug,
  page,
  children,
}: {
  searchQuery: string;
  categorySlug: string;
  page: number;
  children: ReactNode;
}) => {
  const { jobs, totalPages, loading } = useJobs(searchQuery, categorySlug, page);

  return <JobsContext.Provider value={{ jobs, totalPages, loading }}>{children}</JobsContext.Provider>;
};

export const useJobsContext = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobsContext deve ser usado dentro de um JobsProvider");
  }
  return context;
};
