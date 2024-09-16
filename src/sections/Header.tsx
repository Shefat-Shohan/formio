"use client";
import LogoIcon from "@/assets/logo.svg";
import MenuIcon from "@/assets/icon-menu.svg";
import MenuCloseIcon from "@/assets/icon-menu-close.svg";
import Link from "next/link";
import { Navbar } from "@/data";
import Button from "@/components/Button";
import { useState } from "react";
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = ()=> {
    setIsOpen(false);
  }
  return (
    <header className="py-4 border-b md:border-none border-white/15 sticky top-0 z-10">
      <div className="absolute inset-0 backdrop-blur md:hidden" />
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block" />
          <div>
            <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
              <Link href="/">
                <LogoIcon className="h-8 w-8" />
              </Link>
            </div>
          </div>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } absolute top-16 left-0 backdrop-blur w-full p-6 md:block md:static md:p-0 md:w-auto md:backdrop-blur-none`}
          >
            <nav className="md:flex md:flex-row md:gap-8 flex flex-col gap-4">
              {Navbar.map((item) => (
                <div key={item.id}>
                  <Link onClick={handleClick}
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
            <Button>Join the waitlist</Button>
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
  );
};
