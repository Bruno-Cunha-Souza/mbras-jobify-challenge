import React from "react";
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
  return (
    <Link href={`/${id}`} className="w-full h-full ">
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
          <ButtonFav />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default React.memo(CardVagas);
