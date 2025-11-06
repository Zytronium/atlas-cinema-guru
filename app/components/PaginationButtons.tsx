export default function PaginationButtons() {
  return (
    <div className="flex justify-center mb-1 gap-1">
      <button className="bg-teal active:bg-neon-teal text-lg text-dark-blue rounded-l-full p-4 w-30 cursor-pointer">
        Previous
      </button>
      <button className="bg-teal active:bg-neon-teal text-lg text-dark-blue rounded-r-full p-4 w-30 cursor-pointer">
        Next
      </button>
    </div>
  );
}
