"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  CalendarIcon,
  LogOutIcon,
  UserCircleIcon,
  LogInIcon,
} from "lucide-react";
import { useSession, signOut, signIn } from "next-auth/react";

const HeaderDesktop = () => {
  const { data, status } = useSession();

  const handleLogoutClick = () => signOut();
  const handleLoginClick = () => signIn("google");

  return (
    <Card className="bg-background rounded-none">
      <CardContent className="px-28 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="font-extrabold text-2xl p-2 rounded-sm bg-secondary text-background drop-shadow-xl hover:-translate-y-1 hover:scale-110 duration-300">
            Cãotinho
          </h1>
        </Link>
        <div className="flex gap-8">
          {data?.user && (
            <Button variant="ghost" asChild>
              <Link href="/bookings">
                <CalendarIcon className="mr-2" size={20} />
                Agendamentos
              </Link>
            </Button>
          )}

          {data?.user ? (
            <Button
              className="flex gap-2"
              variant="ghost"
              onClick={handleLogoutClick}
            >
              <Avatar>
                <AvatarImage src={data.user?.image ?? ""} sizes="100vw" />
              </Avatar>

              <h2 className="flex gap-2">
                {data.user.name}
                <LogOutIcon size={20} />
              </h2>
            </Button>
          ) : (
            <Button
              className="flex gap-2"
              variant="ghost"
              onClick={handleLoginClick}
            >
              <UserCircleIcon size={26} />
              Fazer Login
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeaderDesktop;
