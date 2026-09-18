"use client";
import React from "react";
import { Menu, Bell } from "lucide-react";
import { COLORS } from "./Colors";


// ====================== patient headers ==============
export function Header({ patient }) {
  return (
    <header
      className="flex items-center justify-between px-6 py-4 shadow-sm"
      style={{
        background: `linear-gradient(155deg, ${COLORS.navy}, ${COLORS.navyDeep})`,
      }}
    >
      <button className="p-2 rounded-md bg-teal-500 text-white">
        <Menu size={18} />
      </button>

      <div className="flex items-center gap-5">
        <button className="bg-red-400 hover:bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md">
          Logout
        </button>

        <Bell className="text-white" size={20} />

        <span className="font-medium text-white">
          {patient?.name || "Patient"}
        </span>

        <img
          src="/GIRL.png"
          alt={patient?.name || "Patient"}
          className="w-9 h-9 rounded-full"
        />
      </div>
    </header>
  );
}

// =================================== headers for doctor ================
export function Headers({ doctor }) {
  return (
    <header
      className="flex items-center justify-between px-6 py-4 shadow-sm"
      style={{
        background: `linear-gradient(155deg, ${COLORS.navy}, ${COLORS.navyDeep})`,
      }}
    >
      <button className="p-2 rounded-md bg-teal-500 text-white">
        <Menu size={18} />
      </button>

      <div className="flex items-center gap-5">
        <button className="bg-red-400 hover:bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md">
          Logout
        </button>

        <Bell className="text-white" size={20} />

        <span className="font-medium text-white">
          {doctor?.name || "Doctor"}
        </span>

        <img
          src="/GIRL.png"
          alt={doctor?.name || "Doctor"}
          className="w-9 h-9 rounded-full"
        />
      </div>
    </header>
  );
}

// ============================== headers for admin =====================
export function Headerss({ admin }) {
  return (
    <div>
          {/* ============== header =================== */}
           <header className="flex items-center justify-between px-6 py-4 shadow-sm"
             style={{ background: `linear-gradient(155deg, ${COLORS.graphiteDeep},${COLORS.graphite} )` }}
            >
            <button className="p-2 rounded-md bg-teal-500 text-white">
                <Menu size={18} />
            </button>

            <div className="flex items-center gap-5">
                <button className="bg-red-400 hover:bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md">
                    Logout
                </button>
                <Bell className="text-white" size={20} />
                <span className="font-medium text-white">{admin.name}</span>
                <img
                    src="/GIRL.png"
                    alt={admin.name}
                    className="w-9 h-9 rounded-full"
                />
            </div>
        </header>
    </div>
  )
}

