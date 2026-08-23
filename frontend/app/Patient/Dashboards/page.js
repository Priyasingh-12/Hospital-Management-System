"use client";
import { Heart, LayoutGrid, User, Calendar } from "lucide-react";
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";


const patient = {
  name: "Priya Singh",
  role: "PATIENT",
  bloodGroup: "O+",
  country: "India",
  visits: "120+",
  medications: "80+",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marshal",
};

const appointments = [
  { firstName: "Priya", lastName: "Singh", date: "14 May 2025", time: "3:30 PM", reason: "Fracture" },
  { firstName: "Priya", lastName: "Singh", date: "30 June 2025", time: "4:30 PM", reason: "General Consultation" },
  { firstName: "Priya", lastName: "Singh", date: "23 June 2025", time: "1:52 PM", reason: "Prescription Refill" },
];
const medications = [
  { name: "Dolo", dose: "200mg", schedule: "0-1-1" },
  { name: "Paracetamol", dose: "500mg", schedule: "Twice a day" },
  { name: "Cough Syrup", dose: "10ml", schedule: "Thrice a day" },
  { name: "PCM", dose: "500mg", schedule: "1-1-1" },
];
// values must add up to 100
const reasonData = [
  { label: "Fracture", value: 47, color: "#3b82f6" },
  { label: "Refill", value: 29, color: "#f97316" },
  { label: "Consultation", value: 14, color: "#22c55e" },
    { label: "Others", value: 10, color: "#6366f1" },

];

const COLORS = ["#6366f1", "#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#ec4899"];

export default function PatientDashboard() {
    const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ---------------- SIDEBAR ---------------- */}
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

      {/* ---------------- MAIN AREA ---------------- */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top header bar */}
        <header className="flex items-center justify-end bg-blue-200 px-6 py-4 shadow-sm">

          <div className="flex items-center gap-5">
            <button className="bg-red-400 hover:bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md">
              Logout
            </button>
            <span className="font-bold text-gray-700">{patient.name}</span>
            <img
              src="/GIRL.png"
              alt={patient.name}
              className="w-9 h-9 rounded-full"
            />
          </div>
        </header>

        {/* ================ content dashboard ======================== */}
        <main className="p-6 space-y-5">
          {/* = part 1 row ====== */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* cards welconme */}
            <div className="rounded-xl bg-blue-100 p-5 shadow flex items-center justify-between ">

              <div>
                <p className="text-md text-green-950">Welcome Back</p>
                <h2 className="texr-2xl font-bold text-indigo-600 ">{patient.name}!</h2>
                <p className="text-xs text-green-950 mt-1"> {patient.bloodGroup}, {patient.country}</p>

                <div className="flex gap-3 mt-4">

                  <div className="bg-indigo-200 p-3 rounded-lg">
                    <p className="text-xs text-green-950">Visits</p>
                    <p className="font-bold text-indigo-600"> {patient.visits}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-orange-100 ">
                    <p className="text-xs text-green-950">Medications</p>
                    <p className="font-bold text-orange-500"> {patient.medications}</p>
                  </div>

                </div>
              </div>
              <img src="/GIRL.png" alt={patient.name} className="w-16 h-16 rounded-full object-cover" />

            </div>

            {/*  =============== visit card ============== */}

            <div className="bg-purple-100 rounded-xl p-5 shadow">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">Visits</p>
                  <p className="text-xs text-gray-400">2025</p>
                </div>
                <p className="text-2xl font-bold">7</p>
              </div>

              {/* ============ simple ========= */}

              <div className="flex items-end gap-3 h-28 mt-4 justify-center">
                <div className="bg-indigo-400 w-8 h-10 rounded"></div>
                <div className="bg-indigo-400 w-8 h-20 rounded"></div>
                <div className="bg-indigo-400 w-8 h-14 rounded"></div>
                <div className="bg-indigo-400 w-8 h-24 rounded"></div>
                <div className="bg-indigo-400 w-8 h-16 rounded"></div>
                <div className="bg-indigo-400 w-8 h-20 rounded"></div>
                <div className="bg-indigo-400 w-8 h-12 rounded"></div>
              </div>

            </div>


          </div>
          {/* ================== ROW 2 ========= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* =============== distribution =========== */}

     <div className="rounded-xl shadow bg-green-100 p-5 w-80">
        <h3 className="font-bold mb-4">Reason Distribution</h3>

        <div className="flex justify-center relative">
          <PieChart width={220} height={220}>
            <Pie
              data={reasonData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {reasonData.map((entry, index) => (
                <Cell
                  key={entry.label}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{ borderRadius: 8, fontSize: 13 }}
            />
          </PieChart>

          {/* center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-green-800">
              {activeIndex !== null ? reasonData[activeIndex].label : "Total"}
            </span>
            <span className="text-lg font-bold text-green-950">
              {activeIndex !== null ? `${reasonData[activeIndex].value}%` : "100%"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-green-950 mt-4">
          {reasonData.map((item, index) => (
            <span
              key={item.label}
              className="flex items-center gap-1.5 cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {item.label} ({item.value}%)
            </span>
          ))}
        </div>
      </div>
            
            {/* ============== appointment ==================== */}
            <div className="bg-blue-100 rounded-xl p-5 shadow">
              <h3 className="font-bold mb-4">
                Appointments
              </h3>
              <div className="space-y-3">
                {appointments.map((item, index) => (
                  <div className="bg-white flex justify-between p-3 rounded-lg border-blue-500 border-l-4 " key={index}>
                    <div >
                      <p className="font-bold text-sm">{item.firstName} {item.lastName}</p>
                      <p className="text-xs text-green-950">{item.reason}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-semibold">{item.date}</p>
                      <p className="text-xs text-gray-700">{item.time}</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* ================== medication ============ */}
            <div className="bg-orange-100 rounded-xl p-5 shadow">
              <h3 className="font-bold mb-4">
                Medications
              </h3>
              <div className="space-y-3">
                {  medications.map((med,index) => (
                  <div key={index} className="bg-white border-l-4 border-orange-400 rounded-lg p-3 flex justify-between items-center">
                    <p className="font-bold text-sm"> {med.name}</p>

                    <div className="text-right">
                      <p className="text-xs font-semibold">{med.dose}</p>
                      <p className="text-xs text-green-950"> {med.schedule}</p>
                    </div>
                  </div>
                ))

                }
              </div>
            </div>

          </div>
        </main>

      </div>

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

