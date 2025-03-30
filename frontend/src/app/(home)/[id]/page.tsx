"use client";
import ToogleTheme from "@/components/elements/ToogleTheme";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useJobDetails } from "../../../hooks/useJobDetails";

const JobDetalhes: React.FC = () => {
  const { id } = useParams();
  const jobId = Array.isArray(id) ? id[0] : id;
  const { job, loading, error } = useJobDetails(jobId);

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
