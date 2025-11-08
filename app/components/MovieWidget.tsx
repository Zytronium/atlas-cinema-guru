"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useState } from "react";
import StarOutline from "@/assets/star_outline.svg";
import StarFilled from "@/assets/star_filled.svg";
import ClockOutline from "@/assets/clock_outline.svg"
import ClockFilled from "@/assets/clock_filled.svg";
import showToast from "@/lib/toast";

interface MovieWidgetProps {
  id: string;
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

export default function MovieWidget({ id, title, year, description, image, genre, favorited, watchLater }: MovieWidgetProps) {
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [isWatchLater, setIsWatchLater] = useState(watchLater);

  return (
    <div className="group relative bg-dark-blue rounded-2xl border-neon-teal border-2 overflow-hidden">
      <Image
        src={image}
        alt={title}
        width={400}
        height={400}
        className="object-cover w-full h-full"
      />

      <div className="absolute top-4 right-4 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-250">
        <button
          onClick={() => toggleFavorite()}
          className="cursor-pointer"
        >
          <Image src={isFavorited ? StarFilled : StarOutline } alt="Favorite" width={24} height={24} />
        </button>
        <button
          onClick={() => toggleWatchLater()}
          className="cursor-pointer"
        >
          <Image src={isWatchLater ? ClockFilled : ClockOutline} alt="Watch Later" width={24} height={24} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-blue text-offwhite p-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-250">
        <h2 className="text-xl">{title} ({year})</h2>
        <p className="text-md mt-1 mb-3">{description}</p>
        <span className="bg-teal text-white text-lg font-medium px-2 py-3 rounded-full">
          {genre}
        </span>
      </div>
    </div>
  );

  async function toggleFavorite() {
    if (typeof window === 'undefined')
      return;

    if (isFavorited) {
      try {
        const response = await fetch(`/api/favorites/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          console.debug(response);
          throw new Error('Network response was not ok');
        }

        setIsFavorited(false);
        showToast("Movie removed from favorites");
      } catch (error) {
        console.error('Error submitting data:', error);
        showToast("Error removing movie from favorites", 5000, 'red', 'offwhite');
      }
    } else {
      try {
        const response = await fetch(`/api/favorites/${id}`, {
          method: 'POST',
        });
        if (!response.ok) {
          console.debug(response);
          throw new Error('Network response was not ok');
        }

        setIsFavorited(true);
        showToast("Movie added to favorites");
      } catch (error) {
        console.error('Error submitting data:', error);
        showToast("Error adding movie to favorites", 5000, 'red', 'offwhite');
      }
    }
  }

  async function toggleWatchLater() {
    if (typeof window === 'undefined')
      return;

    if (isWatchLater) {
      try {
        const response = await fetch(`/api/watch-later/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          console.debug(response);
          throw new Error('Network response was not ok');
        }

        setIsWatchLater(false);
        showToast("Movie removed from watch later");
      } catch (error) {
        console.error('Error submitting data:', error);
        showToast("Error removing movie from watch later", 5000, 'red', 'offwhite');
      }
    } else {
      try {
        const response = await fetch(`/api/watch-later/${id}`, {
          method: 'POST',
        });
        if (!response.ok) {
          console.debug(response);
          throw new Error('Network response was not ok');
        }

        setIsWatchLater(true);
        showToast("Movie added to watch later");
      } catch (error) {
        console.error('Error submitting data:', error);
        showToast("Error adding movie to watch later", 5000, 'red', 'offwhite');
      }
    }
  }
}
