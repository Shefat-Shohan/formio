"use client";
import { motion } from "framer-motion";
import { testimonials } from "@/data";
import Image from "next/image";
import { Fragment } from "react";

export const Testimonials = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-4xl md:text-6xl text-center tracking-tighter font-medium">
          Beyond Expectations
        </h2>
        <p className="text-white/70 text-md md:text-xl text-center mt-5 tracking-tight max-w-sm mx-auto">
          Our revolutionary form builder tools have transformed our client&apos;s
          strategies.
        </p>
        <div className="overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            initial={{ translateX: "-50%" }}
            animate={{ translateX: "0" }}
            transition={{
              ease: "linear",
              repeat: Infinity,
              duration: 10,
            }}
            className="flex gap-5 pr-5 flex-none"
          >
            {[...new Array(2)].fill(0).map((_, index) => (
              <Fragment key={index}>
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="border border-white/15 p-6 md:p-10 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,69,255,.3),black)] max-w-xs flex-none md:max-w-md "
                  >
                    <p className="text-lg tracking-tight md:text-2xl">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center gap-3 mt-5">
                      <div className="relative after:content-[''] after:absolute after:inset-0 after:bg-[rgb(140,65,244)] after:rounded-lg after:mix-blend-soft-light before:content-[''] before:absolute before:inset-0 before:border before:border-white-30 before:z-10 before:rounded-lg">
                        <Image
                          src={testimonial.avatarImg}
                          alt="testimonial.avatarImg"
                          className="h-11 w-11 rounded-lg grayscale "
                        />
                      </div>
                      <div>
                        <h2>{testimonial.name}</h2>
                        <span className="text-white/50 text-sm">
                          {testimonial.title}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
