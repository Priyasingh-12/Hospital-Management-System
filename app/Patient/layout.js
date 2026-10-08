"use client";
import Sidebar from "../../components/Patients/Sidebar/Sidebar";
import { Header } from "../../Common/Header";
import { COLORS } from "../../Common/Colors";
import { patient } from "../../Common/PatientDashboardData";

export default function PatientsLayout({ children }) {
  return (
    <div
      className="flex h-screen  w-full overflow-hidden" style={{ background: COLORS.bg, color: COLORS.ink }} >
      <Sidebar patient={patient} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header patient={patient} />
        {children}
      </div>
    </div>
  );
}