"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/Patients/Sidebar/Sidebar";
import { Header } from "../../../Common/Header";
import { COLORS } from "../../../Common/Colors";
import { patient, appointments, medications, medicineDose, documents, ALERTS } from "../../../Common/PatientDashboardData";

import {
  Activity,
  Heart,
  Droplet,
  AlertTriangle,
  Thermometer,
  Wind,
} from "lucide-react";

export default function PatientDashboard() {
  const nextDose = medicineDose[0];

  return (
    <div className="flex h-screen bg0-gray-50"
      style={{ background: COLORS.bg0, fontFamily: "'Inter', system-ui, sans-serif" }} >
      {/* =====================  sidebar  ================= */}
      <Sidebar patient={patient} />
      {/* ---------------- MAIN AREA ---------------- */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* =================== Top header bar =============== */}
        <Header patient={patient} />
        {/* ================ content dashboard ======================== */}
        <main className="p-6 space-y-5">
          {/* ============================================= */}
          {/* = part 1 row ====== */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* cards welconme */}

            <div className="rounded-xl bg-blue-50 p-5 shadow ">

              <div className="flex items-center gap-9">
                <img
                  src="/GIRL.png"
                  alt={patient.name} 
                  className="w-12 h-12 rounded-full object-cover border border-slate-300 flex-shrink-0" />
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">{patient.name}</h1>
                  <p className="text-xs text-slate-500 mt-0.5">{patient.country}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-4 flex-wrap">

                <div className="bg-indigo-200 p-3 rounded-lg">
                  <p className="text-xs mt-1 text-slate-700">Visits</p>
                  <p className="font-bold mt-3 text-indigo-600">{patient.visits}</p>
                </div>

                <div className="p-3 rounded-lg bg-orange-100">
                  <p className="text-xs mt-1 text-slate-700">Next dose due</p>
                  <p className="font-bold mt-3 text-orange-500 text-sm">
                    {nextDose.name} · {nextDose.schedule}
                  </p>
                </div>

                <div
                  className="rounded-2xl p-5 flex items-center justify-between"
                  style={{ background: COLORS.teal }}
                >
                  <div>
                    <p className="text-xs mb-1" style={{ color: "#B9CFC9" }}>
                      Blood group
                    </p>
                    <p className="text-lg font-semibold text-white">O+</p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.12)" }}  >
                    <Droplet size={18} color="#fff" fill="#fff" />
                  </div>
                </div>

              </div>

            </div>

            {/*  ===============  Alerts ============== */}
            <div className="bg-purple-50 rounded-xl p-5 shadow">
              <h2 className="text-base font-semibold mb-3" style={{ color: COLORS.ink }}>
                Alerts
              </h2>
              <div className="flex flex-col gap-2.5">
                {ALERTS.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl"
                    style={{
                      background: a.level === "warn" ? COLORS.redTint : COLORS.tealTint,
                    }}
                  >
                    <AlertTriangle
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: a.level === "warn" ? COLORS.red : COLORS.tealDeep }}
                    />
                    <p
                      className="text-xs leading-snug"
                      style={{ color: a.level === "warn" ? "#7A2E22" : COLORS.tealDeep }}
                    >
                      {a.text}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>
          {/* ===================================== STAT ROWS ========================== */}
          <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
            <StatCard
              icon={Heart}
              label="Heart rate"
              value="75"
              unit="bpm"
              tone="indigo"
            />
            <StatCard
              icon={Activity}
              label="Blood pressure"
              value="122/80"
              unit="mmHg"
              tone="green"
            />
            <StatCard
              icon={Thermometer}
              label="Temperature"
              value="98.4"
              unit="°F"
              tone="amber"
            />
            <StatCard
              icon={Wind}
              label="Oxygen (SpO2)"
              value="98"
              unit="%"
              tone="rose"
               />
          </div>

          {/* ================== ROW 2 ========= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* =============== distribution =========== */}

            {/* ================== Documents ============ */}
            <div className="bg-green-50 rounded-xl p-5 shadow">
              <h3 className="font-bold mb-4">Documents & Reports</h3>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="bg-white border-l-4 border-teal-400 rounded-lg p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-sm">{doc.title}</p>
                      <p className="text-xs text-gray-500">{doc.date} · {doc.type}</p>
                    </div>
                    < a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-teal-600 hover:underline"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* ============== appointment ==================== */}
            <div className="bg-blue-50 rounded-xl p-5 shadow">
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
            <div className="bg-orange-50 rounded-xl p-5 shadow">
              <h3 className="font-bold mb-4">
                Medications
              </h3>
              <div className="space-y-3">
                {medications.map((med, index) => (
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

          {/* =================    visit card ====================== */}
          <div className="bg-purple-50 rounded-xl p-5 shadow">
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
        </main>

      </div>

    </div>
  )
}

// ====================================================================
const TONE_MAP = {
  teal: { card: "#F0FDFA", bg: COLORS.tealTint, fg: COLORS.tealDeep },
  amber: { card: "#FFFBEB", bg: COLORS.amberTint, fg: "#8A5F1E" },
  indigo: { card: "#EEF2FF", bg: "#E0E7FF", fg: "#4338CA" },
  rose: { card: "#FFF1F2", bg: "#FFE4E6", fg: "#BE123C" },
  green: { card: "#F0FDF4", bg: "#DCFCE7", fg: "#15803D" },
  blue: { card: "#EFF6FF", bg: "#DBEAFE", fg: "#1D4ED8" },
};

function StatCard({ icon: Icon, label, value, unit, tone = "teal" }) {
  const { card, bg, fg } = TONE_MAP[tone] ?? TONE_MAP.teal;

  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: card, border: `1px solid ${COLORS.line}` }}
  >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
        style={{ background: bg }}
      >
        <Icon size={15} style={{ color: fg }} />
      </div>
      <p className="text-xs mb-1" style={{ color: COLORS.inkMuted }}>
        {label}
      </p>
      <p className="text-lg font-semibold" style={{ color: COLORS.ink }}>
        {value} <span className="text-xs font-normal" style={{ color: COLORS.inkMuted }}>{unit}</span>
      </p>
    </div>
  );
}