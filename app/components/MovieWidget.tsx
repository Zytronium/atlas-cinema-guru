"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import StarOutline from "@/assets/star_outline.svg";
import StarFilled from "@/assets/star_filled.svg";
import ClockOutline from "@/assets/clock_outline.svg"
import ClockFilled from "@/assets/clock_filled.svg";
import showToast from "@/lib/toast";

interface MovieWidgetProps {
  title: string;
  year: number;
  description: string;
  image: string | StaticImport;
  genre:
    'Romance' | 'Horror'   | 'Drama'   | 'Action' | 'Mystery'  |
    'Fantasy' | 'Thriller' | 'Western' | 'Sci-Fi' | 'Adventure';
  favorited: boolean;
  watchLater: boolean;
}

export default function MovieWidget({ title, year, description, image, genre, favorited, watchLater }: MovieWidgetProps) {
  "use client";
  return (
    <div className="group relative bg-dark-blue rounded-2xl border-neon-teal border-2 overflow-hidden">
      <Image
        src={image}
        alt={title}
        width={400}
        height={400}
        className="object-cover"
      />

      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100">
        <button
          onClick={() => showToast("Movie favorited")}
          className="cursor-pointer"
        >
          <Image src={favorited ? StarFilled : StarOutline } alt="Favorite" width={24} height={24} />
        </button>
        <button
          onClick={() => showToast("Movie added to watch later")}
          className="cursor-pointer"
        >
          <Image src={watchLater ? ClockFilled : ClockOutline} alt="Watch Later" width={24} height={24} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-blue text-offwhite p-4 opacity-0 group-hover:opacity-100">
        <h2 className="text-xl">{title} ({year})</h2>
        <p className="text-md mt-1 mb-3">{description}</p>
        <span className="bg-teal text-white text-lg font-medium px-2 py-3 rounded-full">
          {genre}
        </span>
      </div>
    </div>
  );
}
