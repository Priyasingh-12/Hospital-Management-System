"use client";
import React, { useState, useRef, useEffect } from "react";
import "../../../../components/Patients/Profile/Profile.css";
import Sidebar from "../../../../components/Patients/Sidebar/Sidebar";

import Header from "../../../../Common/Header";
import { COLORS } from "../../../../Common/Colors";

import {
    Heart,
    Calendar,
    Pencil,
    Phone,
    MapPin,
    Droplet,
    AlertTriangle,
    ShieldCheck,
    ChevronRight,
    Check,
    X,
    Download,
} from "lucide-react";

const INITIAL_PATIENT = {
    name: "Priya Singh",
    role: "Patient",
    email: "priyasingh82001@gmail.com",
    memberId: "MC-08421-IN",
    memberSince: "2019",
    bloodGroup: "O+",
    dob: "15 May 1990",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marshal",
    fields: {
        phone: "+91 98765 43210",
        address: "123 Main Street, Mumbai, India",
        aadhar: "1234 5678 9012",
        allergies: "Peanuts",
        emergency: "Rohan Singh · +91 98111 22334",
    },
    nextAppointment: "Dr. Mehta · Cardiology · Sat, 14 Sept · 10:30 AM",
};

const FIELD_ROWS = [
    { key: "phone", label: "Phone", icon: Phone },
    { key: "address", label: "Address", icon: MapPin },
    { key: "aadhar", label: "Aadhar no.", icon: ShieldCheck },
    { key: "allergies", label: "Allergies", icon: AlertTriangle, flag: true },
    { key: "emergency", label: "Emergency contact", icon: Phone },
];


export default function ProfilPage() {


    const [patient, setPatient] = useState(INITIAL_PATIENT);
    const [draft, setDraft] = useState(INITIAL_PATIENT.fields);
    const [editing, setEditing] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);

    const noticeTimeout = useRef(null);

    // Cleanup timer when component unmounts
    useEffect(() => {
        return () => {
            clearTimeout(noticeTimeout.current);
        };
    }, []);

    // Start editing
    function startEdit() {
        setDraft(patient.fields);
        setEditing(true);
        setSavedNotice(false);
    }

    // Cancel editing
    function cancelEdit() {
        setDraft(patient.fields);
        setEditing(false);
    }

    // Save changes
    function saveEdit() {
        setPatient((p) => ({
            ...p,
            fields: draft,
        }));

        setEditing(false);
        setSavedNotice(true);

        clearTimeout(noticeTimeout.current);

        noticeTimeout.current = setTimeout(() => {
            setSavedNotice(false);
        }, 3000);
    }

    return (
        <div className="flex h-screen  w-full overflow-hidden" style={{ background: COLORS.bg, color: COLORS.ink }}>

            {/* =====================  sidebar  ================= */}
             <Sidebar patient={patient} />
            {/* ========================== main  area ============================= */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                 <Header patient={patient} />
                {/* ================================== profile content =================== */}
                <main className="p-6 md:p-10">
                    <div className="mx-auto max-w-3xl">

                        <div className="flex items-start justify-between gap-4 mb-1">
                            <h1 className="font-display text-[28px] leading-tight" style={{ color: COLORS.ink }}>
                                {INITIAL_PATIENT.name}
                            </h1>
                            {savedNotice && (
                                <span
                                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full mt-1"
                                    style={{ background: "#E4EFE9", color: COLORS.tealDeep }}
                                    role="status"
                                >
                                    <Check size={13} />
                                    Saved
                                </span>
                            )}

                        </div>

                        {/* ======================= appointment context strip ====================== */}
                        <div className="flex items-center gap-3 text-sm mb-8 pb-6 "
                            style={{ borderBottom: `1px solid ${COLORS.line}`, color: COLORS.inkMuted }}>

                            <Calendar size={15} style={{ color: COLORS.amber }} />
                            <span>
                                Next appointment ·{" "}
                                <span style={{ color: COLORS.ink, fontWeight: 500 }}>{patient.nextAppointment}</span>
                            </span>
                        </div>
                        {/* =================== id card ============== */}
                        <div
                            className="card-enter relative rounded-2xl overflow-hidden mb-10"
                            style={{ background: `linear-gradient(155deg, ${COLORS.teal}, ${COLORS.tealDeep})` }}
                        >
                            {/* =====water mark of heart */}
                            <Heart
                                size={160}
                                strokeWidth={1}
                                className="absolute -right-8 -bottom-10 pointer-events-none"
                                style={{ color: "rgba(255,255,255,0.06)" }}
                                aria-hidden="true"
                            />

                            <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
                                <button
                                    className="flex items-center justify-center w-8 h-8 rounded-full"
                                    style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
                                    aria-label="Download card"
                                    title="Download card"
                                >
                                    <Download size={14} />
                                </button>
                                <button
                                    type="button"
                                    onClick={startEdit}
                                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                                    style={{
                                        background: "rgba(255,255,255,0.12)",
                                        color: "#fff",
                                        border: "1px solid rgba(255,255,255,0.25)",
                                    }}
                                >
                                    <Pencil size={13} />
                                    Edit
                                </button>
                            </div>

                            <div className="relative flex flex-col sm:flex-row">
                                {/* ============= left identity == */}
                                <div className="flex sm:flex-col  items-center sm:items-start gap-4 p-7 sm:gap-5 sm:w-[42%]">

                                    <img src="/GIRL.png"
                                        alt={patient.name}
                                        className="w-20 h-20 rounded-full border-4 border-gray-700 mb-3" />
                                    <div>
                                        <p className="font-display text-2xl text-white leading-none mb-1.5">
                                            {patient.name}
                                        </p>
                                        <p className="text-xs" style={{ color: "#B9CFC9" }}>
                                            {patient.email}
                                        </p>
                                    </div>
                                </div>
                                {/* ============ Perforation ==================  */}
                                <div className="relative hidden sm:block w-px" style={{ background: "rgba(255,255,255,0.22)" }}>
                                    <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full" style={{ background: COLORS.bg }} />
                                    <span className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full" style={{ background: COLORS.bg }} />
                                </div>
                                <div className="block sm:hidden mx-7 h-px" style={{ background: "rgba(255,255,255,0.22)" }} />

                                {/* ============== right card stats ======================== */}
                                <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-7 flex-1">
                                    <Stat label="Member ID" value={patient.memberId} />
                                    <Stat label="Member since" value={patient.memberSince} />
                                    <Stat label="Date of birth" value={patient.dob} />

                                    <div >
                                        <p className="text-[11px] mb-1" style={{ color: "#9DB8B1" }}>
                                            Blood group
                                        </p>
                                        <div className=" flex items-center gap-1.5">
                                            <Droplet size={13} style={{ color: COLORS.amber }} fill={COLORS.amber} />
                                            <span className="text-sm font-medium text-white">{patient.bloodGroup}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* ======================= personal information ============== */}
                        <div className="rounded-2xl px-6 py-2"
                            style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }} >
                            <div className="flex items-center justify-between pt-5 pb-3">
                                <h2 className="font-display text-lg" style={{ color: COLORS.ink }}>
                                    Personal information
                                </h2>
                                {editing && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-green-100"
                                            style={{
                                                color: COLORS.inkMuted,
                                                border: `1px solid ${COLORS.line}`,
                                            }}
                                        >
                                            <X size={13} />
                                            Cancel
                                        </button>

                                        <button
                                            type="button"
                                            onClick={saveEdit}
                                            className="flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-green-100"
                                            style={{
                                                color: COLORS.inkMuted,
                                                border: `1px solid ${COLORS.line}`,
                                            }}
                                        >
                                            <Check size={13} />
                                            Save changes
                                        </button>


                                    </div>
                                )}

                            </div>

                            {FIELD_ROWS.map((row) => {
                                const Icon = row.icon;

                                const value = editing
                                    ? draft[row.key]
                                    : patient.fields[row.key];

                                return (
                                    <div
                                        key={row.key}
                                        className="flex items-center gap-4 py-4"
                                        style={{
                                            borderTop: `1px solid ${COLORS.line}`,
                                        }}
                                    >
                                        {/* Icon */}
                                        <Icon
                                            size={20}
                                            style={{ color: COLORS.inkMuted }}
                                            className="shrink-0"
                                        />

                                        {/* Label */}
                                        <label
                                            htmlFor={`field-${row.key}`}
                                            className="text-sm w-40 font-medium shrink-0"
                                            style={{ color: COLORS.ink }}
                                        >
                                            {row.label}
                                        </label>

                                        {/* Value / Input */}
                                        {editing ? (
                                            <input
                                                type="text"
                                                id={`field-${row.key}`}
                                                className="field-input"
                                                value={draft[row.key]}
                                                onChange={(e) =>
                                                    setDraft((d) => ({
                                                        ...d,
                                                        [row.key]: e.target.value,
                                                    }))
                                                }
                                            />
                                        ) : row.flag ? (
                                            <span
                                                className="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full"
                                                style={{
                                                    background: COLORS.amberTint,
                                                    color: "#8A5F1E",
                                                }}
                                            >
                                                {value}
                                            </span>
                                        ) : (
                                            <span
                                                className="text-sm"
                                                style={{ color: COLORS.inkMuted }}
                                            >
                                                {value}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}

                        </div>

                    </div>
                </main>



            </div>
        </div>
    )
}


function Stat({ label, value }) {
    return (
        <div>
            <p className="text-[11px] mb-1" style={{ color: "#9DB8B1" }}>
                {label}
            </p>
            <p className="text-sm font-medium text-white">{value}</p>
        </div>
    );
}
