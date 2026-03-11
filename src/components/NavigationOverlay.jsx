import {
  AudioLines,
  Compass,
  House,
  LayoutGrid,
  LogOut,
  Settings,
  UserCircle2,
  X
} from "lucide-react";
import { navigate } from "../lib/navigation";

const MENU_ITEMS = [
  { id: "account", label: "David Eserin", icon: UserCircle2 },
  { id: "home", label: "Home", icon: House, href: "/player" },
  { id: "browse", label: "Browse", icon: Compass, href: "/" },
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "signout", label: "Sign out", icon: LogOut }
];

function NavigationOverlay({ open, onClose }) {
  const handleNavigate = (href) => {
    onClose();
    navigate(href);
  };

  if (!open) {
    return null;
  }

  return (
    <aside className="absolute inset-0 z-50 flex flex-col bg-white px-6 pb-8 pt-3">
      <div className="mb-6 flex items-center justify-between text-[13px] font-semibold text-[#1d1f24]">
        <span>9:41</span>
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="rounded-md p-1 text-[#4b4f56]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <ul className="space-y-6">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.id}>
              {item.href ? (
                <button
                  type="button"
                  onClick={() => handleNavigate(item.href)}
                  className="flex items-center gap-4 text-[16px] font-medium text-[#22262d]"
                >
                  <Icon className="h-5 w-5 text-[#8c8c8c]" />
                  {item.label}
                </button>
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-4 text-[16px] font-medium text-[#22262d]"
                >
                  <Icon className="h-5 w-5 text-[#8c8c8c]" />
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-auto pb-2">
        <div className="flex items-center gap-1.5 text-[18px] font-semibold leading-none text-[#1f232a]">
          <AudioLines className="h-4 w-4" />
          Versions
        </div>
        <p className="mt-2 text-[14px] text-[#8a8a8a]">V1.08</p>
      </div>
    </aside>
  );
}

export default NavigationOverlay;
