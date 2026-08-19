 import { Plus } from "lucide-react";

export default function SidebarItem({
  text,
  icon,
  active = false,
  showPlus = false,
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
        active
          ? "bg-blue-300 text-white"
          : "text-gray-300 hover:bg-gray-100 hover:text-green-950"
      }`}
    >
      {/* Left Icon */}
      {icon}

      {/* Text */}
      <span className="flex-1">
        {text}
      </span>

      {/* Plus Icon */}
      {showPlus && (
        <Plus
          size={19}
          strokeWidth={2.5}
          className="text-gray-300"
        />
      )}
    </div>
  );
}