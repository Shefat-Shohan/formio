import { ElementLayoutProps } from "@/data/type";

const EmelentLayoutCard = ({ layout }: { layout: ElementLayoutProps }) => {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-white/30 rounded-xl p-3 group cursor-pointer hover:border-[#8A43FC] transition-colors duration-150">
      {
        <layout.icon className="size-6 group-hover:bg-[#8A43FC] rounded-full p-1" />
      }
      <h2 className="text-xs whitespace-nowrap ">{layout.label}</h2>
    </div>
  );
};

export default EmelentLayoutCard;
