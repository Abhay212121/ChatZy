import Icon from "@mdi/react";
import { mdiSofaSingle } from "@mdi/js";

export function Sidebar() {
  return (
    <div className="w-90 bg-purple-300 h-full">
      <div className="flex items-center gap-4">
        <div className="text-white">
          <Icon
            path={mdiSofaSingle}
            size={1}
          />
        </div>
        <p className="font-h1">Room Name:</p>
      </div>
    </div>
  );
}
