"use client";
import { Heart, LayoutGrid, User, Calendar, Bell, Pencil, Menu } from "lucide-react";
import React from 'react'


const patient = {
    name: "Priya Singh",
    role: "PATIENT",
    email: "priyasingh82001@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marshal",
    info: [
        { label: "Date of Birth", value: "1990-05-15" },
        { label: "Phone", value: "+91 9876543210" },
        { label: "Address", value: "123, Main Street, Mumbai, India" },
        { label: "Aadhar No", value: "1234-5678-9012" },
        { label: "Blood Group", value: "O+" },
        { label: "Allergies", value: "Peanuts" },
    ],
};

export default function ProfilPage() {
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
          <SidebarLink icon={<LayoutGrid size={18} />} label="Dashboard" />
          <SidebarLink icon={<User size={18} />} label="Profile" active />
          <SidebarLink icon={<Calendar size={18} />} label="Appointments" />
        </nav>
      </aside>

      {/* ---------------- MAIN AREA ---------------- */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top header bar */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
          <button className="p-2 rounded-md bg-teal-500 text-white">
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-5">
            <button className="bg-red-400 hover:bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md">
              Logout
            </button>
            <Bell className="text-teal-500" size={20} />
            <span className="font-medium text-gray-700">{patient.name}</span>
            <img
              src="/GIRL.png"
              alt={patient.name}
              className="w-9 h-9 rounded-full"
            />
          </div>
        </header>

        {/* Profile content */}
        <main className="p-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            {/* Profile header row */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <div className="flex items-center gap-5">
                <img
                src="/GIRL.png"
                  alt={patient.name}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {patient.name}
                  </h1>
                  <p className="text-gray-500">{patient.email}</p>
                </div>
              </div>

              <button className="flex items-center gap-2 bg-blue-300 hover:bg-blue-400 text-white font-medium px-5 py-2.5 rounded-lg">
                <Pencil size={16} />
                Edit
              </button>
            </div>

            {/* Personal Information table */}
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">
              Personal Information
            </h2>

            <div className="rounded-lg overflow-hidden">
              {patient.info.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex px-6 py-4 ${
                    i % 2 === 0 ? "bg-blue-200" : "bg-white"
                  }`}
                >
                  <span className="w-48 font-semibold text-gray-700">
                    {item.label}
                  </span>
                  <span className="text-gray-600">{item.value}</span>
                </div>
              ))}
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

