"use client";
import LogoIcon from "@/assets/logo.svg";
import MenuIcon from "@/assets/icon-menu.svg";
import MenuCloseIcon from "@/assets/icon-menu-close.svg";
import Link from "next/link";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { user } = useUser();
  const Navbar = [
    {
      id: 1,
      title: "Features",
      link: "#",
    },
    {
      id: 2,
      title: "Developers",
      link: "#",
    },
    {
      id: 3,
      title: "Company",
      link: "#",
    },
    {
      id: 4,
      title: "Blog",
      link: "#",
    },
  ];

  if (user) {
    Navbar.push({
      id: 6,
      title: "Dashboard",
      link: "/dashboard",
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(false);
  };
  const path = usePathname();
  return (
    !path.includes("aiform") && (
      <header className="py-4 border-b md:border-none border-white/15 sticky top-0 z-10">
        <div className="absolute inset-0 backdrop-blur md:hidden" />
        <div className="container">
          <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
            <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block" />
            <div>
              <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
                <Link href="/">
                  <LogoIcon className="size-8" />
                </Link>
              </div>
            </div>
            <div
              className={`${
                isOpen ? "block" : "hidden"
              } absolute top-[58px] backdrop-blur-lg w-full p-6 md:block md:static md:p-0 md:w-auto md:backdrop-blur-none`}
            >
              <nav className="md:flex md:flex-row md:gap-8 flex flex-col gap-4">
                {Navbar?.length > 0 &&
                  Navbar.map((item) => (
                    <div key={item.id}>
                      <Link
                        onClick={handleClick}
                        href={item.link}
                        className="cursor-pointer text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {item.title}
                      </Link>
                    </div>
                  ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              {!user ? (
                <Link href="/sign-in">
                  <Button>Get started</Button>
                </Link>
              ) : (
                <UserButton />
              )}
              <span
                className="cursor-pointer md:hidden sm:block"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <MenuCloseIcon /> : <MenuIcon />}
              </span>
            </div>
          </div>
        </div>
      </header>
    )
  );
};
