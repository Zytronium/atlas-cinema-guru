import "@/app/globals.css";
import { Metadata } from "next";
import Logo from "@/assets/app_logo.svg";
import Logout from "@/assets/logout.svg";
import Image from "next/image";
import { auth } from "@/auth"
import { signOut } from "@/auth"
import Sidebar from "@/app/components/Sidebar";

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

    <div className="flex flex-row pt-15 h-screen">
    <Sidebar />
      <main className="flex-1 ml-0 md:ml-21 pt-14 md:pt-0 justify-center overflow-auto text-offwhite">
        {children}
      </main>
    </div>
    </body>
    </html>
  );
}
