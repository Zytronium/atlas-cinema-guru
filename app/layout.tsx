import "@/app/globals.css";
import { Metadata } from "next";
import Logo from "@/assets/app_logo.svg";
import Folder from "@/assets/folder_filled.svg";
import Star from "@/assets/star_filled.svg";
import Clock from "@/assets/clock_filled.svg";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
    <body className="antialiased bg-blue text-offwhite min-h-screen flex flex-col">
    <header className="flex items-center bg-neon-teal text-blue h-15 px-2">
      <Image src={Logo} alt="logo" height={24} width={24} />
      <h1 className="text-2xl font-bold">Cinema Guru</h1>
    </header>

    <div className="flex flex-row flex-1">
      <nav className="group sticky bg-teal text-white w-21 hover:w-56 px-2 flex flex-col pl-7.5 py-6 gap-6 overflow-auto">

        <Link href="/" className="flex row gap-2 items-center">
          <Image src={Folder} alt={""} height={24} width={24} />
          <p className="text-sm hidden group-hover:block">Home</p>
        </Link>

        <Link href="/" className="flex row gap-2 items-center">
          <Image src={Star} alt={""} height={24} width={24} />
          <p className="text-sm hidden group-hover:block">Favorites</p>
        </Link>

        <Link href="/" className="flex row gap-2 items-center">
          <Image src={Clock} alt={""} height={24} width={24} />
          <p className="text-sm hidden group-hover:block">Watch Later</p>
        </Link>
      </nav>
      <main className="flex flex-1 justify-center overflow-auto text-offwhite">
        {children}
      </main>
    </div>
    </body>
    </html>
  );
}
