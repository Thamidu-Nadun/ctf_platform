import { Calendar, Home, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideBar({ isSideBarOpen, setIsSideBarOpen }) {
  const pathname = usePathname();
  const links = [
    { name: "Dashboard", Icon: Home, path: "" },
    { name: "Events", Icon: Calendar, path: "/events" },
  ];

  const isActive = (path) =>
    pathname === "/dashboard" + path ||
    (path !== "" && pathname.startsWith("/dashboard" + path + "/"));

  return (
    <div
      className={`${isSideBarOpen ? "w-64" : "w-20"} fixed inset-y-0 left-0 z-50 overflow-y-auto border-r border-slate-800 bg-slate-950 transition-all duration-300 ease-in-out`}
    >
      <nav
        className={`mx-2 my-2 flex flex-col pt-5 ${isSideBarOpen ? "" : "items-center"}`}
      >
        <div className="flex w-full items-center justify-between px-4 font-mono text-xl font-bold text-white">
          {isSideBarOpen ? "RAVEN//TRACE" : ""}
          <button
            type="button"
            aria-label={isSideBarOpen ? "Collapse sidebar" : "Expand sidebar"}
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className="cursor-pointer text-slate-400 transition-colors hover:text-emerald-400"
          >
            <Menu size={24} />
          </button>
        </div>
        <ul className="mt-8 flex w-full flex-col gap-y-2 px-2 text-sm">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={`/dashboard${link.path}`}
                className={`flex w-full items-center gap-3 rounded px-4 py-3 transition-colors ${
                  isActive(link.path)
                    ? "border border-emerald-500/50 bg-emerald-500/15 text-emerald-400"
                    : "text-slate-400 hover:bg-slate-900 hover:text-emerald-400"
                }`}
              >
                <link.Icon size={18} />
                {isSideBarOpen ? link.name : ""}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
