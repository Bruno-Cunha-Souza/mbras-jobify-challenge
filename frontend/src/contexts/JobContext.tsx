import { createContext, useContext, ReactNode } from "react";
import { useJobDetails } from "../hooks/useJobDetails";

interface JobContextType {
  job: { description: string } | null;
  loading: boolean;
  error: string | null;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ id, children }: { id: string; children: ReactNode }) => {
  const { job, loading, error } = useJobDetails(id);

  return <JobContext.Provider value={{ job, loading, error }}>{children}</JobContext.Provider>;
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext deve ser usado dentro de um JobProvider");
  }
  return context;
};
