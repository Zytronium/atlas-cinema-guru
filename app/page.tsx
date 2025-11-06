import MovieWidget from "@/app/components/MovieWidget";
import Placeholder from "@/assets/placeholder.svg";
import PaginationButtons from "@/app/components/PaginationButtons";

export default async function Page() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex text-lg items-center justify-between h-full px-16 pr-24">
        <div>
          <div>
            Search
          </div>
          <div className="flex items-center justify-center h-full">
            <div>Min Year</div>
            <div className="px-8"></div>
            <div>Max Year</div>
          </div>
        </div>
        <div>Genre</div>
      </div>
      <div className="pb-2 flex row flex-wrap gap-4 justify-between mx-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <MovieWidget
            key={i}
            title={`Cars ${i > 0 ? i + 1 : ''}`}
            year={2006 + i * 5}
            description={i == 0 ? "The original Cars movie" : `The ${i}${getNumberSuffix(i)} sequel to Cars`}
            image={Placeholder}
            genre={i < 5 ? "Adventure" : "Sci-Fi"}
          />
        ))}
      </div>
      <PaginationButtons />
    </div>
  );
}

function getNumberSuffix(n: number) {
  switch (n % 10) {
    case 1:
      return n % 100 !== 11 ? "st" : "th";

    case 2:
      return n % 100 !== 12 ? "nd" : "th";

    case 3:
      return n % 100 !== 13 ? "rd" : "th";

    default:
      return "th";
  }
}
