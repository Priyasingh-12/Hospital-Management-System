
"use client";
import { Heart, LayoutGrid, User, Calendar, Bell, Save, X, Menu } from "lucide-react";
import React, { useState } from "react";

const initialPatient = {
  name: "Priya Singh",
  role: "PATIENT",
  email: "priyasingh82001@gmail.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marshal",
  dob: "1990-05-15",
  phone: "+91 9876543210",
  address: "123, Main Street, Mumbai, India",
  aadhar: "1234-5678-9012",
  bloodGroup: "O+",
  allergies: "Peanuts",
};

const fields = [
  { key: "dob", label: "Date of Birth", type: "date" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "address", label: "Address", type: "text" },
  { key: "aadhar", label: "Aadhar No", type: "text" },
  { key: "bloodGroup", label: "Blood Group", type: "text" },
  { key: "allergies", label: "Allergies", type: "text" },
];

export default function EditProfilePage() {
  const [form, setForm] = useState(initialPatient);
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Hook this up to your update API / mutation
    setSaved(true);
  };

  const handleCancel = () => {
    setForm(initialPatient);
    setSaved(false);
  };

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
          alt={form.name}
          className="w-20 h-20 rounded-full border-4 border-gray-700 mb-3"
        />
        <p className="font-semibold">{form.name}</p>
        <p className="text-xs text-gray-400 tracking-wide mb-10">{form.role}</p>

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
        <header className="flex items-center justify-between bg-blue-200 px-6 py-4 shadow-sm">
          <button className="p-2 rounded-md bg-teal-500 text-white">
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-5">
            <button className="bg-red-400 hover:bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md">
              Logout
            </button>
            <Bell className="text-teal-500" size={20} />
            <span className="font-medium text-gray-700">{form.name}</span>
            <img src="/GIRL.png" alt={form.name} className="w-9 h-9 rounded-full" />
          </div>
        </header>

        {/* Edit profile content */}
        <main className="p-8">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            {/* Header row */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <div className="flex items-center gap-5">
                <img
                  src="/GIRL.png"
                  alt={form.name}
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="text-2xl font-bold text-gray-800 border-b border-transparent focus:border-blue-300 focus:outline-none bg-transparent"
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="text-gray-500 border-b border-transparent focus:border-blue-300 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-green-950 font-medium px-5 py-2.5 rounded-lg"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-300 hover:bg-blue-400 text-white font-medium px-5 py-2.5 rounded-lg"
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
            </div>

            {/* Personal Information form */}
            <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">
              Personal Information
            </h2>

            <div className="rounded-lg overflow-hidden">
              {fields.map((field, i) => (
                <div
                  key={field.key}
                  className={`flex items-center px-6 py-4 ${
                    i % 2 === 0 ? "bg-blue-200" : "bg-white"
                  }`}
                >
                  <label
                    htmlFor={field.key}
                    className="w-48 font-semibold text-gray-700"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.key}
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="flex-1 text-gray-700 bg-white border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              ))}
            </div>

            {saved && (
              <p className="mt-6 text-sm font-medium text-green-600">
                Changes saved.
              </p>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-blue-300 text-white"
          : "text-white-300 hover:bg-blue-300 hover:text-green-950"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
