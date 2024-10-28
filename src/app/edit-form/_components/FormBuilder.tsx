import { FormElements } from "./FormElements";
import SideBarButtonElements from "./SideBarButtonElements";

export default function FormBuilder() {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border border-white/15 bg-black overflow-y-auto h-full p-4">
        Elements
      <SideBarButtonElements formElement={FormElements.TextField} />
    </aside>
  );
}
