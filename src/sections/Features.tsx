"use client";
import { tabs } from "@/data";
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from "@dotlottie/react-player";
import productIamge from "@/assets/product-image.png";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  ValueAnimationTransition,
} from "framer-motion";

const FeaturedTab = (
  props: (typeof tabs)[number] &
    ComponentPropsWithoutRef<"div"> & { selected: boolean }
) => {
  const dotlottieRef = useRef<DotLottieCommonPlayer>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const xPercentage = useMotionValue(0);
  const yPercentage = useMotionValue(0);

  useEffect(() => {
    if (!tabRef.current || !props.selected) return;
    xPercentage.set(0);
    yPercentage.set(0);
    const { height, width } = tabRef.current?.getBoundingClientRect();
    const measuereArea = height * 2 + width * 2;
    const times = [
      0,
      width / measuereArea,
      (width + height) / measuereArea,
      (width * 2 + height) / measuereArea,
      1,
    ];
    const options: ValueAnimationTransition = {
      times,
      duration: 4,
      ease: "linear",
      repeatType: "loop",
      repeat: Infinity,
    };
    animate(xPercentage, [0, 100, 100, 0, 0], options);
    animate(yPercentage, [0, 0, 100, 100, 0], options);
  }, [props.selected]);

  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`;

  const handleTabHover = () => {
    if (dotlottieRef.current === null) return;
    dotlottieRef.current.seek(0);
    dotlottieRef.current.play();
  };
  return (
    <div
      ref={tabRef}
      onMouseEnter={handleTabHover}
      onClick={props.onClick}
      className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center flex-1 relative cursor-pointer"
    >
      {props.selected && (
        <motion.div
          style={{
            maskImage,
          }}
          className={`absolute -m-px inset-0 border border-[#A369FF] rounded-xl`}
        ></motion.div>
      )}

      <div className="h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center">
        <DotLottiePlayer
          ref={dotlottieRef}
          src={props.icon}
          className="h-5 w-5"
          autoplay
        />
      </div>
      <div className="flex items-center justify-center gap-2">
        <h2 className="font-medium">{props.title}</h2>
        {props.isNew === true && (
          <div className="text-xs rounded-full px-2 py-0.5 bg-[#8c44ff] text-white font-semibold">
            New
          </div>
        )}
      </div>
    </div>
  );
};

export const Features = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const backgroundPositionX = useMotionValue(tabs[0].backgroundPositionX);
  const backgroundPositionY = useMotionValue(tabs[0].backgroundPositionY);
  const backgroundSizeX = useMotionValue(tabs[0].backgroundSizeX);

  const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;
  const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;
  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
    const animateOption: ValueAnimationTransition = {
      duration: 2,
      ease: "easeInOut",
    };
    animate(
      backgroundSizeX,
      [backgroundPositionX.get(), 100, tabs[index].backgroundSizeX], animateOption
    );
    animate(
      backgroundPositionX,
      [backgroundPositionX.get(), 100, tabs[index].backgroundPositionX], animateOption
    );
    animate(
      backgroundPositionY,
      [backgroundPositionY.get(), 100, tabs[index].backgroundPositionY], animateOption
    );
  };
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <h2 className="text-4xl md:text-6xl font-medium text-center tracking-tighter">
        AI-powered form generation tools
        </h2>
        <p className="text-white/70 text-md md:text-xl max-w-2xl mx-auto tracking-tight text-center mt-5">
          From small startups to large enterprise, our AI-driven tool has
          revolutioized the way business approach customer.
        </p>
        <div className="mt-10 flex flex-col lg:flex-row gap-3">
          {tabs.map((item, index) => (
            <FeaturedTab
              key={index}
              {...item}
              selected={selectedTab === index}
              onClick={() => handleSelectTab(index)}
            />
          ))}
        </div>
        <div className="border border-white/20 p-2.5 rounded-xl mt-3">
          <motion.div
            className="aspect-video bg-cover border border-white/20 rounded-lg"
            style={{
              backgroundPosition,
              backgroundSize,
              backgroundImage: `url(${productIamge.src})`,
            }}
          ></motion.div>
          
        </div>
      </div>
    </section>
  );
};
