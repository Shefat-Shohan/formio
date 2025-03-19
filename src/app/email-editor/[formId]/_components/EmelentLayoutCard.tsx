import { ElementLayoutProps } from "@/data/type";

const EmelentLayoutCard = ({ layout }: { layout: ElementLayoutProps }) => {
  return (
    <div className="flex flex-col items-center justify-center border border-white/15 rounded-xl p-3 group cursor-pointer hover:bg-white/15 transition-colors duration-150">
      {<layout.icon className="size-7 rounded-full p-1" />}
      <h2 className=" text-xs md:text-sm tracking-wide whitespace-nowrap ">
        {layout.label}
      </h2>
    </div>
  );
};

export default EmelentLayoutCard;
