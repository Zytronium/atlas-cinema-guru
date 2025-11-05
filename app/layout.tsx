import "@/app/globals.css";
import { Metadata } from "next";
import Logo from "@/assets/app_logo.svg";
import Folder from "@/assets/folder_filled.svg";
import Star from "@/assets/star_filled.svg";
import Clock from "@/assets/clock_filled.svg";
import Logout from "@/assets/logout.svg";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth"
import { signOut } from "@/auth"

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = await auth();

  return (
    <html lang="en">
    <body className="antialiased bg-dark-blue text-offwhite min-h-screen">
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center bg-neon-teal text-dark-blue h-15 px-4">
      <a href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="logo" height={24} width={24} />
        <h1 className="text-2xl font-bold">Cinema Guru</h1>
      </a>
      <div className="flex row items-center gap-4 text-lg">
        <p className="hidden md:block">Welcome, {session && session.user? session.user.email : "user" }</p>

        <form
          className="flex row items-center gap-1 cursor-pointer"
          action={async () => {
            "use server"
            await signOut();
          }}
        >
          <Image src={Logout} alt={""} height={16} width={16}/>
          <button type="submit" className="cursor-pointer">Logout</button>
        </form>
      </div>
    </header>

    {/* Mobile Nav */}
    <nav className="md:hidden fixed top-15 left-0 right-0 z-40 bg-teal text-white flex flex-row justify-start gap-6 py-3 px-4">
      <Link href="/" className="flex row items-center gap-1">
        <Image src={Folder} alt={""} height={24} width={24} />
        <p className="text-xs">Home</p>
      </Link>

      <Link href="/" className="flex row items-center gap-1">
        <Image src={Star} alt={""} height={24} width={24} />
        <p className="text-xs">Favorites</p>
      </Link>

      <Link href="/" className="flex row items-center gap-1">
        <Image src={Clock} alt={""} height={24} width={24} />
        <p className="text-xs">Watch Later</p>
      </Link>
    </nav>

    {/* Desktop Nav */}
    <div className="flex flex-row pt-15 h-screen">
      <nav
        className="hidden md:flex fixed top-15 left-0 bottom-0 z-40 group bg-teal text-white w-21 hover:w-56 flex-col px-5 py-6 gap-6 ">
        <Link href="/" className="flex row ml-2.5 gap-2 items-center">
          <Image src={Folder} alt={""} height={24} width={24} />
          <p className="text-sm hidden group-hover:block">Home</p>
        </Link>

        <Link href="/" className="flex row ml-2.5 gap-2 items-center">
          <Image src={Star} alt={""} height={24} width={24} />
          <p className="text-sm hidden group-hover:block">Favorites</p>
        </Link>

        <Link href="/" className="flex row ml-2.5 gap-2 items-center">
          <Image src={Clock} alt={""} height={24} width={24} />
          <p className="text-sm hidden group-hover:block">Watch Later</p>
        </Link>
        <div className="flex-col gap-2 items-center self-center hidden group-hover:md:flex bg-neon-teal auto text-darker-blue w-full mx-auto overflow-auto no-scrollbar pt-4 rounded-2xl p-2">
          <p className="font-bold text-lg">Latest Activities</p>
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="text-lg">
              This is dummy content line {i + 1}.
            </p>
          ))}
        </div>
      </nav>
      <main className="flex-1 ml-21 pt-14 md:pt-0 justify-center overflow-auto text-offwhite ">
        {children}
      </main>
    </div>
    </body>
    </html>
  );
}
