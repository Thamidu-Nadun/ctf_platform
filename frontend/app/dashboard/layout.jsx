"use client";
import { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";

export default function Layout({ children }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsSideBarOpen(window.innerWidth >= 774);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
      {/* SideBar */}
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      {/* Main Content */}
      <div
        className={`min-h-screen transition-all duration-300 ease-in-out ${isSideBarOpen ? "ml-64" : "ml-20"}`}
      >
        <header className="h-12 border-b border-slate-800 bg-slate-950" />
        <main className="relative w-full">{children}</main>
      </div>
    </div>
  );
}
