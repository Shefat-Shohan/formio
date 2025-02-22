import Image from "next/image";
import LogoIcon from "@/assets/logo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CodeXml, Monitor, Smartphone } from "lucide-react";
import { useScreenSize } from "@/app/context/screenSizeContext";

type Props = {};

const EditorHeader = (props: Props) => {
  const { screenSize, setScreenSize } = useScreenSize();
  return (
    <div className="p-4 border-b border-white/15 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className={`border size-10 rounded-lg inline-flex justify-center items-center border-white/15`}
        >
          <LogoIcon className="size-6" />
        </Link>
        {/* <span>Formio</span> */}
      </div>
      <div className=" gap-3 md:flex hidden">
        <Button
          onClick={() => setScreenSize("desktop")}
          variant="outline"
          className={`bg-transparent border-none hover:bg-[#2F2F2F] ${
            screenSize == "desktop" && "bg-[#7C34F0] text-black"
          }`}
        >
          <span className="text-white flex gap-2 items-center">
            <Monitor /> Desktop
          </span>
        </Button>
        <Button
          onClick={() => setScreenSize("mobile")}
          variant="outline"
          className={`bg-transparent border-none hover:bg-[#2F2F2F] ${
            screenSize == "mobile" && "bg-[#7C34F0] text-black"
          }`}
        >
          <span className="text-white flex gap-2 items-center">
            <Smartphone /> Mobile
          </span>
        </Button>
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="bg-transparent border-none hover:bg-[#2F2F2F]"
        >
          <CodeXml className="hover:text-white text-white" />
        </Button>
        <Button
          variant="outline"
          className="bg-transparent transition-colors duration-300 border-white/50"
        >
          Send Test Email
        </Button>
        <Button className="bg-[#8A43FC] hover:bg-[#7C34F0]">
          Save Template
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
