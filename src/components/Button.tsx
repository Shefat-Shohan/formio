export default function Button(props: React.PropsWithChildren) {
  return (
    <button className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] ">
      <span className="absolute inset-0">
        <span
          className=" absolute inset-0  [mask-image:linear-gradient(to_bottom,black,transprent)]
      "
        >
          <span className="rounded-lg border-2 border-white/30 absolute inset-0  [mask-image:linear-gradient(to_top,black,transprent)]">
            <span className="rounded-md absolute inset-0 shadow-[0_0_6px_rgb(140,69,255,.7)_inset]"></span>
          </span>
        </span>
      </span>
      <span>{props.children}</span>
    </button>
  );
}
