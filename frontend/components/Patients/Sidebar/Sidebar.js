import React from 'react'
import { Heart, LayoutGrid, User, Calendar, } from "lucide-react";

const patient = {
  name: "Priya Singh",
  role: "PATIENT",
  bloodGroup: "O+",
  country: "India",
  visits: "120+",
  medications: "80+",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marshal",
};


export default function Sidebar() {
    return (
        <div className='flex h-screen bg-gray-50' >
            {/* ================= sidebar ======================= */}
            <aside className="w-64 bg-gray-900 text-white flex flex-col items-center py-8 shrink-0">
                {/* Logo */}
                <div className="flex items-center gap-2 text-blue-300 font-bold text-2xl mb-10">
                    <Heart className="fill-red-900" />
                    MEDICARE +
                </div>

                {/* Avatar + name */}
                <img
                    src="/GIRL.png"
                    alt={patient.name}
                    className="w-20 h-20 rounded-full border-4 border-gray-700 mb-3" />
                <p className="font-semibold">{patient.name}</p>
                <p className="text-xs text-gray-400 tracking-wide mb-10">{patient.role}</p>

                {/* Navigation */}
                <nav className="w-full flex flex-col gap-1 px-4">
                    <SidebarLink icon={<LayoutGrid size={18} />} active label="Dashboard" />
                    <SidebarLink icon={<User size={18} />} label="Profile" />
                    <SidebarLink icon={<Calendar size={18} />} label="Appointments" />
                </nav>
            </aside>
           
        </div>
    )
}



function SidebarLink({ icon, label, active }) {
    return (
        <button
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                ? "bg-blue-300 text-white"
                : "text-white-300 hover:bg-blue-300 hover:text-green-950"
                }`}
        >
            {icon}
            {label}
        </button>
    );
}
