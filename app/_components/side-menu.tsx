"use client";

import { Avatar, AvatarImage } from "./ui/avatar";
import {
  LogOutIcon,
  UserCircleIcon,
  LogInIcon,
  HomeIcon,
  CalendarIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { useSession, signOut, signIn } from "next-auth/react";

const SideMenu = () => {
  const { data, status } = useSession();

  const handleLogoutClick = () => signOut();

  const handleLoginClick = () => signIn("google");
  return (
    <>
      <SheetHeader className="p-5 text-left border-b border-solid border-secondary">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex justify-between items-center px-5 py-6">
          <div className="flex items-center gap-3 ">
            <Avatar>
              <AvatarImage src={data.user?.image ?? ""} />
            </Avatar>

            <h2 className="font-bold">{data.user.name}</h2>
          </div>
          <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col px-5 py-6 gap-3">
          <div className="flex items-center gap-2 ">
            <UserCircleIcon className="text-gray-400" size={32} />
            <h2 className="font-bold">Olá, faça seu login!</h2>
          </div>
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleLoginClick}
          >
            <LogInIcon className="mr-2" size={20} />
            Fazer Login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" asChild>
          <Link href="/">
            <HomeIcon className="mr-2" size={20} />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" asChild>
            <Link href="/bookings">
              <CalendarIcon className="mr-2" size={20} />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default SideMenu;
