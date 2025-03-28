import React from "react";

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
      <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded">
        Anterior
      </button>
      <span>{`Página ${currentPage} de ${totalPages}`}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded">
        Próxima
      </button>
    </div>
  );
};

export default Pagination;
