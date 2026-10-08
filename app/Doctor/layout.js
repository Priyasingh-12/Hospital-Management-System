"use client";
import Sidebar from "../../components/Doctors/Sidebar/Sidebar";
import { Headers } from "../../Common/Header";
import { COLORS } from "../../Common/Colors";
import { doctor } from "../../Common/DoctorDashboardData";

export default function PatientsLayout({ children }) {
  return (
    <div
      className="flex h-screen  w-full overflow-hidden" style={{ background: COLORS.bg, color: COLORS.ink }} >
      <Sidebar doctor={doctor} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Headers doctor={doctor} />
        {children}
      </div>
    </div>
  );
}