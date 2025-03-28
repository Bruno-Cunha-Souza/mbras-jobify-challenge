import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardCompany } from "@/components/ui/card";
import ButtonFav from "./ButtonFav";
import DOMPurify from "dompurify";

interface CardVagasProps {
  company: string;
  logo?: string;
  title: string;
  data: string;
  salary: string;
  job_tyme: string;
  description: string;
  url: string;
}

const CardVagas: React.FC<CardVagasProps> = ({ company, logo, title, data, job_tyme, salary, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <>
      <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={handleClick}>
        <CardHeader className="flex items-center gap-3">
          {logo && <Image src={logo} alt={`${company} logo`} width={32} height={32} className="rounded-md object-cover" priority />}
          <CardCompany>{company}</CardCompany>
        </CardHeader>
        <CardTitle className="px-6">{title}</CardTitle>
        <CardContent>
          <p>{job_tyme}</p>
          <p>{salary}</p>
        </CardContent>
        <CardFooter>
          <p>{data}</p>
          <ButtonFav />
        </CardFooter>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 " style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={closeModal}>
          <div className="h-[80vh] bg-white p-6 rounded-lg shadow-lg max-w-lg w-full overflow-hidden overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(CardVagas);
