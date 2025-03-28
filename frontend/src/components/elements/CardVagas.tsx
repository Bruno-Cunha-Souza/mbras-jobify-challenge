import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardCompany } from "@/components/ui/card";
import ButtonFav from "./ButtonFav";
import Link from "next/link";

interface CardVagasProps {
  id: number;
  company: string;
  logo?: string;
  title: string;
  data: string;
  salary: string;
  job_tyme: string;
  description: string;
  url: string;
}

const CardVagas: React.FC<CardVagasProps> = ({ id, company, logo, title, data, job_tyme, salary }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteToggle = (jobId: number, newFavoriteState: boolean) => {
    setIsFavorited(newFavoriteState);
  };

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      if (token) {
        try {
          const response = await fetch(`http://localhost:3001/api/jobs/favorites/status/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setIsFavorited(data.isFavorited);
        } catch (error) {
          console.error("Erro ao verificar status do favorito:", error);
        }
        return;
      }
    };

    fetchFavoriteStatus();
  }, [id]);

  return (
    <div className="w-full h-full ">
      <Link href={`/${id}`}>
        <Card className="cursor-pointer hover:shadow-lg transition-all min-h-68">
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
          </CardFooter>
        </Card>
      </Link>
      <ButtonFav jobId={id} isFavorited={isFavorited} onFavoriteToggle={handleFavoriteToggle} />
    </div>
  );
};

export default React.memo(CardVagas);
