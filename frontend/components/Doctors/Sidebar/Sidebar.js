
import React from 'react'
import { Heart, LayoutGrid, User, Calendar } from "lucide-react";

import { COLORS } from "../../../Common/Colors";

export default function Sidebar({ doctor }) {
    return (
        <div className='flex h-screen bg-gray-50'>
            <aside
                className="flex flex-col py-8 px-5 font-body md:flex w-64 shrink-0 hidden"
                          style={{ background: COLORS.navyDeep,color: "#EAF0EE"}}
            >
                <div className="flex items-center gap-2 mb-12 px-1 font-bold text-2xl">
                    <Heart className="fill-red-900" />
                    <span className="font-display text-lg tracking-tight text-white-600">
                        MEDICARE +
                    </span>
                </div>

                <div className="flex  flex-col items-center gap-3 mb-10 px-1">
                    <img
                        src="/GIRL.png"
                        alt={doctor?.name || "Doctor"}
                        className="w-20 h-20 rounded-full border-4 border-gray-700 mb-3"    />
                    <div className="min-w-0">
                        <p className="text-sm font-medium truncate text-white"  style={{ background: COLORS.gold, color: COLORS.navyDeep }}>{doctor.name}</p>
                        <p className="text-xs text-gray-400 tracking-wide mb-10 text-[#8FA39D]">{doctor.role}</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-0.5">
                    <SidebarLink icon={<LayoutGrid size={17} />} label="Dashboard" />
                    <SidebarLink icon={<User size={17} />} label="Profile" />
                    <SidebarLink icon={<Calendar size={17} />} label="Appointments" />
                </nav>
            </aside>
        </div>
    )
}


// // ======================================== sidebar link =====================================
function SidebarLink({ icon, label }) {
    return (
        <button
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-left transition-colors duration-200 cursor-pointer text-[#9DB0AB] border-l-2 border-transparent hover:text-white hover:bg-white/10 hover:border-[#B98530]"
        >
            {icon}
            {label}
        </button>
    );
}