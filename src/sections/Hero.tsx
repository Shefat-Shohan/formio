"use client";
import Button from "@/components/Button";
import SartBg from "@/assets/stars.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
export const Hero = () => {
  const sectionRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

const backgroundPositionY = useTransform(scrollYProgress, [0,1], [-300,300])
  return (
    <motion.section
      ref={sectionRef}
      className="h-[492px] md:h-[800px] flex items-center relative overflow-hidden [mask-image:radial-gradient(100%_65%_at_50%_50%,black,transparent)]"
      style={{
        backgroundImage: `url(${SartBg.src})`,
        backgroundPositionY
      }}
      animate={{
        backgroundPositionX: SartBg.width,
      }}
      transition={{
        duration: 120,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(140,69,255,.5)_15%,rgb(14,0,36,.5)_78%,transparent)]" />
      <div className="absolute h-64 w-64 md:h-96 md:w-96 bg-purple-500 rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(184,148,255)_37.7%,rgb(24,0,66))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(140,69,255)]">
        {/* first circle */}
        <motion.div
          style={{
            translateY: "-50%",
            translateX: "-50%",
          }}
          animate={{
            rotate: "1turn",
          }}
          transition={{
            repeat: Infinity,
            duration: "60",
            ease: "linear",
          }}
          className="absolute h-[344px] w-[344px] md:h-[580px] md:w-[580px] border border-white/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute h-2 w-2 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2  bg-white rounded-full" />
          <div className="absolute h-2 w-2 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white rounded-full " />
          <div className="absolute h-5 w-5 top-1/2 left-full -translate-x-1/2 -translate-y-1/2 border  border-white rounded-full inline-flex justify-center items-center">
            <div className="h-2 w-2  bg-white rounded-full " />
          </div>
        </motion.div>
        {/* second circle */}
        <motion.div
          style={{
            translateY: "-50%",
            translateX: "-50%",
          }}
          animate={{
            rotate: "1turn",
          }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
          className="absolute h-[444px] w-[444px] md:h-[780px] md:w-[780px] border border-white/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        ></motion.div>
        {/* third circle */}
        <motion.div
          style={{
            translateY: "-50%",
            translateX: "-50%",
          }}
          animate={{
            rotate: "1turn",
          }}
          transition={{
            repeat: Infinity,
            duration: 90,
            ease: "linear",
          }}
          className="absolute h-[544px] w-[544px] md:w-[980px] md:h-[980px] border border-white/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute h-2 w-2 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2  bg-white rounded-full " />
          <div className="absolute h-2 w-2 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white rounded-full " />
          <div className="absolute h-5 w-5 top-1/2 left-full -translate-x-1/2 -translate-y-1/2 border  border-white rounded-full inline-flex justify-center items-center">
            <div className="h-2 w-2  bg-white rounded-full " />
          </div>
        </motion.div>
      </div>
      <div className="container relative">
        <h1 className="text-8xl font-semibold bg-white tracking-tighter bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,50%))] text-transparent bg-clip-text text-center md:text-[168px]">
          Formio
        </h1>
        <p className="text-md md:text-md max-w-xl mx-auto text-white md:leading-6 mt-5 text-center">
          
        Effortlessly enhance your site&apos;s visibility with AI-powered tools, combining smart technology and user-friendly forms for a seamless experience.
        </p>
        <div className="flex justify-center mt-5">
          <Link href="/sign-in"><Button>Start for free</Button></Link>
        </div>
      </div>
    </motion.section>
  );
};
