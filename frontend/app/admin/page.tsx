"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"challenges" | "events">(
    "challenges",
  );

  // Sample Challenges Data
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "SQL Injection 101",
      category: "Web",
      difficulty: "Easy",
      points: 100,
      active: true,
    },
    {
      id: 2,
      title: "PCAP Network Traffic Analysis",
      category: "Forensics",
      difficulty: "Medium",
      points: 250,
      active: true,
    },
  ]);

  // Sample Events Data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "RAVEN CTF 2026 Qualifier",
      startDate: "2026-11-01",
      status: "Upcoming",
    },
  ]);

  const [newChal, setNewChal] = useState({
    title: "",
    category: "Web",
    difficulty: "Easy",
    points: 100,
  });
  const [newEvent, setNewEvent] = useState({ title: "", startDate: "" });

  // Handle Admin Passcode Verification
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === "admin" && adminPass === "raven2026") {
      setIsAdminAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Access Denied: Incorrect Admin Credentials!");
    }
  };

  const handleAddChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChal.title) return alert("Title required!");
    setChallenges([
      ...challenges,
      {
        id: Date.now(),
        ...newChal,
        points: Number(newChal.points),
        active: true,
      },
    ]);
    setNewChal({ title: "", category: "Web", difficulty: "Easy", points: 100 });
  };

  const handleToggleChallenge = (id: number) => {
    setChallenges(
      challenges.map((c) => (c.id === id ? { ...c, active: !c.active } : c)),
    );
  };

  const handleDeleteChallenge = (id: number) => {
    if (confirm("Delete challenge?")) {
      setChallenges(challenges.filter((c) => c.id !== id));
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.startDate)
      return alert("Fill all fields!");
    setEvents([...events, { id: Date.now(), ...newEvent, status: "Upcoming" }]);
    setNewEvent({ title: "", startDate: "" });
  };

  // ADMIN VERIFICATION DIALOG
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-mono">
        <div className="max-w-md w-full border border-red-900/60 bg-slate-900/90 rounded-xl p-6 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-red-500 text-xs tracking-widest">
              {"// PRIVILEGED AREA"}
            </span>
            <h1 className="text-xl font-bold text-red-500 mt-1">
              VERIFY ADMIN ACCESS
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Re-enter admin passcode to access control panel.
            </p>
          </div>

          {authError && (
            <div className="mb-4 text-xs bg-red-950/80 border border-red-600/50 text-red-400 p-2.5 rounded text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                ADMIN USERNAME
              </label>
              <input
                type="text"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-red-500"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                ADMIN PASSCODE
              </label>
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-red-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex gap-2">
              <Link
                href="/"
                className="w-1/2 py-2 text-center border border-slate-800 rounded text-xs text-slate-400 hover:bg-slate-800"
              >
                CANCEL
              </Link>
              <button
                type="submit"
                className="w-1/2 py-2 bg-red-600/30 hover:bg-red-600/50 border border-red-500 text-red-400 font-bold rounded text-xs transition"
              >
                VERIFY & ENTER
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-mono">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-emerald-400 text-xs">
              {"// VERIFIED: SUPER ADMIN"}
            </span>
            <h1 className="text-2xl font-bold">ADMIN PANEL WORKSPACE</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="px-3 py-1.5 text-xs border border-slate-700 rounded text-slate-300 hover:bg-slate-800"
            >
              EXIT TO HOME
            </Link>
            <button
              onClick={() => setIsAdminAuthenticated(false)}
              className="px-3 py-1.5 text-xs bg-red-950 border border-red-600 text-red-400 rounded hover:bg-red-900"
            >
              LOCK ADMIN
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-4 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("challenges")}
            className={`text-sm font-bold ${activeTab === "challenges" ? "text-emerald-400 border-b-2 border-emerald-400 pb-1" : "text-slate-400"}`}
          >
            CHALLENGES ({challenges.length})
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`text-sm font-bold ${activeTab === "events" ? "text-emerald-400 border-b-2 border-emerald-400 pb-1" : "text-slate-400"}`}
          >
            EVENTS ({events.length})
          </button>
        </div>

        {/* Challenges Section */}
        {activeTab === "challenges" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <h3 className="text-emerald-400 font-bold text-sm mb-3">
                + Create Challenge
              </h3>
              <form onSubmit={handleAddChallenge} className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Title"
                  value={newChal.title}
                  onChange={(e) =>
                    setNewChal({ ...newChal, title: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded"
                />
                <select
                  value={newChal.category}
                  onChange={(e) =>
                    setNewChal({ ...newChal, category: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded"
                >
                  <option value="Web">Web</option>
                  <option value="Forensics">Forensics</option>
                  <option value="Reverse Engineering">
                    Reverse Engineering
                  </option>
                </select>
                <select
                  value={newChal.difficulty}
                  onChange={(e) =>
                    setNewChal({ ...newChal, difficulty: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <input
                  type="number"
                  placeholder="Points"
                  value={newChal.points}
                  onChange={(e) =>
                    setNewChal({ ...newChal, points: Number(e.target.value) })
                  }
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 py-2 rounded font-bold"
                >
                  ADD CHALLENGE
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-3">
              {challenges.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between items-center bg-slate-900/80 border border-slate-800 p-3 rounded"
                >
                  <div>
                    <div className="font-bold text-emerald-400 text-sm">
                      {c.title}
                    </div>
                    <div className="text-xs text-slate-400">
                      {c.category} | {c.difficulty} | {c.points} pts
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => handleToggleChallenge(c.id)}
                      className={`px-3 py-1 rounded border ${c.active ? "bg-emerald-950 border-emerald-600 text-emerald-400" : "bg-amber-950 border-amber-600 text-amber-400"}`}
                    >
                      {c.active ? "ACTIVE" : "DISABLED"}
                    </button>
                    <button
                      onClick={() => handleDeleteChallenge(c.id)}
                      className="bg-red-950 border border-red-600 text-red-400 px-3 py-1 rounded"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Section */}
        {activeTab === "events" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <h3 className="text-emerald-400 font-bold text-sm mb-3">
                + Schedule Event
              </h3>
              <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Event Name"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded"
                />
                <input
                  type="date"
                  value={newEvent.startDate}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, startDate: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 py-2 rounded font-bold"
                >
                  CREATE EVENT
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-3">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="flex justify-between items-center bg-slate-900/80 border border-slate-800 p-3 rounded text-xs"
                >
                  <div>
                    <div className="font-bold text-emerald-400 text-sm">
                      {ev.title}
                    </div>
                    <div className="text-slate-400">Date: {ev.startDate}</div>
                  </div>
                  <span className="bg-slate-800 px-2.5 py-1 rounded text-slate-300">
                    {ev.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
