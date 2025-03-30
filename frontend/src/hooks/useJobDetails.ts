import { useEffect, useState } from "react";

interface JobProps {
  description: string;
}

export function useJobDetails(id: string | undefined) {
  const [job, setJob] = useState<JobProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
          if (!res.ok) {
            throw new Error("Erro ao buscar dados da vaga");
          }
          const data = await res.json();
          console.log("Dados da vaga:", data);
          setJob(data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Erro desconhecido");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchJob();
    }
  }, [id]);

  return { job, loading, error };
}