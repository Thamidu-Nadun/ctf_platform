import { Home, Slash } from "lucide-react";
import Link from "next/link";

export default function BreadCrumb({
  main_title = "home",
  sub_title = "dashboard",
  main_to = "/",
  sub_to = "/",
}) {
  return (
    <div className="flex items-center space-x-4 text-sm shadow-md text-gray-500 bg-white py-2 px-4 border border-gray-500/30 rounded">
      <button type="button">
        <Home className="w-4 h-4" />
      </button>
      <Slash className="w-3 h-3" />
      <Link href={main_to}>{main_title}</Link>
      <Slash className="w-3 h-3" />
      <Link href={sub_to}>{sub_title}</Link>
    </div>
  );
}
