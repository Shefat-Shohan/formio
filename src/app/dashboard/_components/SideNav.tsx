import {
  ChevronFirst,
  ChevronLast,
  LayoutDashboard,
  LibraryBig,
  LineChart,
  MessageSquare,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoIcon from "@/assets/logo.svg";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { sidebarMenu } from "@/data";
import { Progress } from "@/components/ui/progress";
import { db } from "../../../../configs";
import { JsonForm } from "../../../../configs/schema";
import { and, desc, eq } from "drizzle-orm";
import { formListType } from "@/data/type";
import { log } from "console";

export default function SideNav() {
  const path = usePathname();
  const [formList, setFormList] = useState([]);
  const [progressValue, setProgressValue] = useState(0);
  useEffect(() => {}, [path]);
  const [expanded, setExpanded] = useState(true);

  const { user } = useUser();
  console.log("formList", formList);
  const isSubscribed = true;

  useEffect(() => {
    user && getActiveUserFormList();
  }, [user]);

  const getActiveUserFormList = async () => {
    const result = await db
      .select()
      .from(JsonForm)
      .where(
        and(
          // @ts-ignore
          eq(JsonForm.createBy, user?.primaryEmailAddress?.emailAddress),
          eq(JsonForm.isDeleted, false)
        )
      )
      .orderBy(desc(JsonForm.id));
    //@ts-ignore
    setFormList(result);
    const percent = (result.length / 3) * 100;
    setProgressValue(percent);
    // Ensure the result is always an array and handle cases where it's undefined or null
    // const formList = Array.isArray(result) ? result : [];
  };

  // resize the sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width:375px)").matches) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="h-screen w-full bg-[#171717]">
      <nav className="h-full border-r border-white/15">
        <motion.div
          className={`h-full p-4 flex flex-col justify-between ${
            expanded ? "" : "items-center"
          }`}
          initial={{ width: expanded ? 220 : 80 }}
          animate={{ width: expanded ? 220 : 80 }}
          transition={{ duration: 0.1 }}
        >
          {/* logo goes here */}
          <div className="flex items-center justify-between gap-6">
            <motion.div
              className={`flex items-center ${expanded ? "block" : "hidden"}`}
              initial={{ opacity: expanded ? 1 : 0 }}
              animate={{ opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/"
                className={`border size-10 rounded-lg inline-flex justify-center items-center border-white/15`}
              >
                <LogoIcon className="size-6" />
              </Link>
              <span className="text-2xl text-white pl-4">Formio</span>
            </motion.div>
            <div
              className="cursor-pointer"
              onClick={() => setExpanded((current) => !current)}
            >
              {expanded ? (
                <ChevronFirst className="size-6" />
              ) : (
                <ChevronLast className="size-6" />
              )}
            </div>
          </div>

          {/* link goes here */}
          <div className="flex flex-col gap-2">
            {sidebarMenu.map((menu, index) => (
              <Link
                onClick={() => {
                  if (window.innerWidth <= 360) {
                    setExpanded(false);
                  }
                }}
                href={menu.path}
                key={index}
                className={`relative flex gap-2.5 items-center py-2 px-3 rounded-lg my-1 font-medium text-white hover:bg-[#212121] hover:text-white cursor-pointer transition-colors ${
                  path == menu.path && "bg-[#303030] text-white"
                }`}
              >
                <menu.icon className="size-4" />
                <motion.span
                  className={`text-sm whitespace-nowrap ${
                    expanded ? "w-full" : "hidden"
                  }`}
                  initial={{ opacity: expanded ? 1 : 0 }}
                  animate={{ opacity: expanded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {menu.name}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* form count*/}
          <div>
            <div>
              {!isSubscribed && (
                <div>
                  {expanded ? (
                    <div>
                      <Progress
                        value={progressValue}
                        className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-full"
                      />

                      <p className="mt-3 text-sm">
                        <span className="font-bold"> {formList.length} </span>{" "}
                        out of <span className="font-bold">3</span> created
                      </p>
                      <p className="mt-4 text-sm">
                        Updgare your plan to create more AI forms
                      </p>
                    </div>
                  ) : (
                    <span>{formList.length}/3</span>
                  )}
                </div>
              )}
            </div>

            {/* footer */}
            <div
              className={`border-t flex items-center justify-between py-3 border-white/15 mt-12`}
            >
              {expanded ? (
                <motion.div
                  initial={{ opacity: expanded ? 1 : 0 }}
                  animate={{ opacity: expanded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 items-center"
                >
                  <span className="text-white text-sm whitespace-nowrap">
                    Manage Account
                  </span>
                  <UserButton />
                </motion.div>
              ) : (
                <UserButton />
              )}
            </div>
          </div>
        </motion.div>
      </nav>
    </aside>
  );
}
