"use client";
import ToogleTheme from "@/components/elements/ToogleTheme";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface JobProps {
  description: string;
}

const JobDetalhes: React.FC = () => {
  const [job, setJob] = useState<JobProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

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

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  if (!job) {
    return <p>Job não encontrada.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <main className="w-3/5 md:px-8 py-12">
        <Link href="/" className="flex gap-1.5 font-bold mb-5">
          <FiArrowLeft size={25} /> Voltar{" "}
        </Link>
        <h2 className="text-3xl font-semibold mb-5">Descrição da Vaga:</h2>
        <div className="prose" dangerouslySetInnerHTML={{ __html: job.description }} />
      </main>
      <footer className="fixed bottom-0 w-full flex items-center justify-end px-6 py-4">
        <ToogleTheme />
      </footer>
    </div>
  );
};

export default JobDetalhes;
