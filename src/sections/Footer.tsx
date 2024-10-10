import LogoImage from "@/assets/logo.svg";
import Link from "next/link";
import XSocial from "@/assets/social-x.svg";
import InstaSocial from "@/assets/social-instagram.svg";
import YTSocial from "@/assets/social-youtube.svg";
export const Footer = () => {
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
  return (
    <footer className="py-5 border-t border-white/15">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className="flex items-center lg:flex-1">
            <Link href="/" className="inline-flex gap-2">
              <LogoImage className="h-6 w-6" />
              <span className="font-medium">Formio</span>
            </Link>
          </div>
          <nav className="flex flex-col lg:flex-row lg:gap-7 gap-5 lg:justify-center">
            {Navbar.map((item) => (
              <div key={item.id}>
                <Link
                  href={item.link}
                  className="cursor-pointer text-xs md:text-sm text-white/70 hover:text-white transition-colors"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </nav>
          <div className="flex gap-5 lg:flex-1 lg:justify-end">
            <XSocial className="text-white/40 hover:text-white transition-colors cursor-pointer" />
            <InstaSocial className="text-white/40 hover:text-white transition-colors cursor-pointer" />
            <YTSocial className="text-white/40 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};
