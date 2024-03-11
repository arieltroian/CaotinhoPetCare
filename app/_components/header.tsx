import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";
import HeaderDesktop from "./header-desktop";

const Header = () => {
  return (
    <>
      <Card className="lg:hidden bg-background rounded-none">
        <CardContent className="p-5 flex items-center justify-between">
          <Link href="/">
            <h1 className="font-extrabold text-2xl text-primary drop-shadow-xl hover:-translate-y-1 hover:scale-110 duration-300">
              Cãotinho
            </h1>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="" variant="ghost" size="icon">
                <MenuIcon size={20} />
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
      <div className="max-lg:hidden">
        <HeaderDesktop />
      </div>
    </>
  );
};

export default Header;
