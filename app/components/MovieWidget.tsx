import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface MovieWidgetProps {
  title: string,
  year: number,
  description: string,
  image: string | StaticImport,
  genre:
    'Romance' | 'Horror'   | 'Drama'   | 'Action' | 'Mystery'  |
    'Fantasy' | 'Thriller' | 'Western' | 'Sci-Fi' | 'Adventure',
}

export default function MovieWidget({ title, year, description, image, genre }: MovieWidgetProps) {
  return (
    <div>
      <Image src={image} alt={title} width={400} height={400} />
    </div>
  );
}
