"use client";
import {
    LayoutDashboard,
    CalendarDays,
    Stethoscope,
    Users,
    UserRound,
    Bed,
    FileText,
    Ambulance,
    Pill,
    LogOut,
    Menu,
    Bell,
    Maximize,
    Plus,
    CheckCircle,
    Trash2,
    Download,
} from "lucide-react";

import DashboardCard , { Appointments,Reports } from "../../../components/DashboardCard";
import SidebarItem from "../../../components/SidebarItem";

export default function AdminDashboard() {
    return (
        <div className=" flex min-h-screen bg-[#f4f7fc]">
            {/* ========= sidebar ============ */}
            <aside className="hidden lg:block w-[250px] min-h-screen bg-[#182031] text-white">
                <div className="flex h-[80px] items-center justify-center border-b border-white/10">
                    <img src="/HOSPO.png" alt="MEDICARE+" className="h-[55px] w-[100px] object-contain" />
                </div>
                {/* user */}

                <div className="flex flex-col items-center px-4 pt-7 ">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#4b91bb] text-l font-bold">
                        PS
                    </div>
                    <h2 className="text-center text-[17px] font-semibold text-white">
                        Priya Singh
                    </h2>
                    <p className="mt-1 text-center text-[14px] text-gray-300">
                        Admin
                    </p>
                </div>

                {/* Navigation */}
                <div className="px-4 py-6">
                    <p className="mb-4 text-xs font-semibold uppercase text-blue-200">Main</p>
                    <nav className="space-y-2">
                        <SidebarItem
                            text="Dashboard"
                            active
                            showPlus
                            icon={<LayoutDashboard size={20} />}
                        />
                        <SidebarItem
                            text="Appointments"
                            showPlus
                            icon={<CalendarDays size={20} />}
                        />

                        <SidebarItem
                            text="Doctors"
                            showPlus
                            icon={<Stethoscope size={20} />} />

                        <SidebarItem
                            text="Staff"
                            showPlus
                            icon={<Users size={20} />} />

                        <SidebarItem
                            text="Patients"
                            showPlus
                            icon={<UserRound size={20} />}
                        />

                        <SidebarItem
                            text="Room Allotment"
                            showPlus
                            icon={<Bed size={20} />}
                        />

                        <SidebarItem
                            text="Ambulance"
                            showPlus
                            icon={<Ambulance size={20} />}
                        />


                        <SidebarItem
                            text="Records"
                            showPlus
                            icon={<FileText size={20} />}
                        />

                        <SidebarItem
                            text="Pharmacy"
                            showPlus
                            icon={<Pill size={20} />}
                        />
                        < SidebarItem text="Logout" icon={<LogOut size={20} color="red" />} showPlus />

                    </nav>
                </div>
            </aside>
            {/* =================== main ====================== */}
            <main className="flex-1">
                {/* header */}
                <header className="flex h-[80px] items-center justify-between  bg-blue-300 px-5 text-white">
                    <button className="rounded-md p-2 hover:bg-white/10">
                        <Menu size={26} />
                    </button>

                    <div className="flex items-center gap-6">
                        <button> <Maximize size={21} /></button>
                        <button>  <Bell size={21} />  </button>

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[#ff6838]">PS</div>
                            <span className="hidden font-small sm:block">Priya Singh </span>
                        </div>
                    </div>
                </header>
                {/* dashboard content */}
                <div className="p-5 lg:p-8">
                    <h1 className="mb-6 text-2xl font-bold text-green-950">Dashboard</h1>

                    {/* card */}
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        <DashboardCard
                            title="Total Patients"
                            value="1,245"
                        />

                        <DashboardCard
                            title="Total Doctors"
                            value="84"
                        />

                        <DashboardCard
                            title="Appointments"
                            value="328"
                        />

                        <DashboardCard
                            title="Available Rooms"
                            value="24"
                        />

                    </div>
                    {/* === bottom section ========== */}
                    <div className="mt-7 grid gap-6 xl:grid-cols-[2fr_380px] ">
                        {/* appointments */}
                        <Appointments />
                        {/* Report */}
                        <Reports/>
                    </div>

                </div>
            </main>

        </div>
    );
}
