"use client";
import { Clients } from "@/data";
import Image from "next/image";
import { Fragment } from "react";
import { motion } from "framer-motion";

export const LogoTicker = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="flex items-center gap-5">
          <div className="flex flex-1 md:flex-none">
            <h2>Trusted by top innovative teams</h2>
          </div>
          <div className="flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              initial={{ translateX: "-50%" }}
              animate={{ translateX: "0" }}
              transition={{
                ease: "linear",
                repeat: Infinity,
                duration: 30,
              }}
              className="flex flex-none gap-14 pr-14"
            >
              {[...new Array(2)].fill(0).map((_, index) => (
                <Fragment key={index}>
                  {Clients.map((client, index) => (
                    <div key={index}>
                      <Image
                        src={client.logo}
                        alt={`${client.logo}`}
                        className="h-6 w-auto"
                      />
                    </div>
                  ))}
                </Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
