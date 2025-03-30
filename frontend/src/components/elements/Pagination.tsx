import React from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange, totalPages }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <ButtonStyled onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2  rounded">
        Anterior
      </ButtonStyled>
      <span>{`Página ${currentPage} de ${totalPages}`}</span>
      <ButtonStyled onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 rounded">
        Próxima
      </ButtonStyled>
    </div>
  );
};

const ButtonStyled = styled.button`
  background-color: var(--secundary);
  font-weight: 500;
  font-size: 1.25rem;
  cursor: pointer;
  color: white;
`;
export default Pagination;
