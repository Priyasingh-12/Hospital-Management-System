"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, LayoutGrid, User, Calendar, Pill } from "lucide-react";
import { COLORS } from "../../../Common/Colors";

const NAV_ITEMS = [
    { href: "/dashboards/patientdashboard", label: "Dashboard", icon: LayoutGrid },
    { href: "/Patient/profile/profilepage", label: "Profile", icon: User },
    { href: "/Patient/appointments", label: "Appointments", icon: Calendar },
    { href: "/patient/medication", label: "Medication", icon: Pill },
];
export default function Sidebar({ patient }) {
    const pathname = usePathname();
    return (
        <div className='flex h-screen bg-gray-50'>
            <aside
                className="flex flex-col py-8 px-5 font-body md:flex w-64 shrink-0 hidden"
                style={{
                    background: `linear-gradient(155deg, ${COLORS.navyDeep}, ${COLORS.navy})`,
                }}  >
                <div className="flex items-center gap-2 mb-3 px-1 font-bold text-2xl">
                    <Heart className="fill-red-900" />
                    <span className="font-display text-lg tracking-tight text-[#9DB0AB]">
                        MEDICARE +
                    </span>
                </div>

                <div className="flex  flex-col items-center gap-3  px-1">
                    <img
                        src="/GIRL.png"
                        alt={patient?.name || "Patient"}
                        className="w-20 h-20 rounded-full border-4 border-gray-700 mb-3" />
                    <div className="min-w-0">
                        <p className="text-sm font-medium truncate text-[#9DB0AB]" >{patient.name}</p>
                        <p className="text-xs text-gray-400 tracking-wide mb-10 text-[#8FA39D]">{patient.role}</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-0.5">
                    {NAV_ITEMS.map((item) => (
                        <SidebarLink
                            key={item.href}
                            href={item.href}
                            icon={<item.icon size={17} />}
                            label={item.label}
                            active={pathname === item.href}
                        />
                    ))}

                </nav>


            </aside>
        </div>
    )
}
// ======================================== sidebar link =====================================

function SidebarLink({ href, icon, label, active }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 border-l-2 ${active
                    ? "text-white bg-white/10 border-[#B98530]"
                    : "text-[#9DB0AB] border-transparent hover:text-white hover:bg-white/10 hover:border-[#B98530]"
                }`}
        >
            {icon}
            {label}
        </Link>
    );
}