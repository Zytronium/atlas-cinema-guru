interface PaginationButtonsProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export default function PaginationButtons({
  currentPage,
  onPageChange,
  totalPages
}: PaginationButtonsProps) {
  return (
    <div className="flex justify-center mb-1 gap-1">
      <button
        className="bg-teal active:bg-neon-teal text-lg text-dark-blue rounded-l-full p-4 w-30 cursor-pointer"
        onClick={() => {
          if (currentPage === 1) return;
          onPageChange(currentPage - 1)
        }}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="bg-teal active:bg-neon-teal text-lg text-dark-blue rounded-r-full p-4 w-30 cursor-pointer"
        onClick={() => {
          if (currentPage === totalPages) return;
          onPageChange(currentPage + 1)
        }}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
