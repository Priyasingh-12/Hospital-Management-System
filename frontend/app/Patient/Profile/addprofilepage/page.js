"use client";
import React, { useState } from "react";
import "../../../../components/Patients/Profile/Profile.css";

import {
    Heart,
    User,
    Calendar,
    Phone,
    MapPin,
    Droplet,
    AlertTriangle,
    ShieldCheck,
    UserPlus,
    Check,
    Syringe,
    Scissors ,
    X,
} from "lucide-react";

const COLORS = {
    bg: "#F6F7F3",
    ink: "#1D2B28",
    inkMuted: "#5B6864",
    teal: "#2F5D57",
    tealDeep: "#1F433C",
    amber: "#B98530",
    line: "#E4E1D8",
    card: "#FFFFFF",
    overlay: "rgba(23, 35, 33, 0.55)",
};

const EMPTY_PATIENT = {
    name: "",
    email: "",
    memberId: "",
    memberSince: String(new Date().getFullYear()),
    dob: "",
    bloodGroup: "",
    phone: "",
    address: "",
    aadhar: "",
    allergies: "",
    Vaccination: "",
    surgeriesPrior: "",
    emergency: "",
    nextAppointment: "",
};

const FORM_SECTIONS = [
    {
        title: "Identity",
        rows: [
            { key: "name", label: "Full name", icon: User, placeholder: "Priya Singh" },
            { key: "email", label: "Email", icon: User, placeholder: "priya@example.com" },
            { key: "memberId", label: "Member ID", icon: ShieldCheck, placeholder: "MC-08421-IN" },
            { key: "memberSince", label: "Member since", icon: Calendar, placeholder: "2025" },
            { key: "dob", label: "Date of birth", icon: Calendar, placeholder: "15 May 1990" },
            { key: "bloodGroup", label: "Blood group", icon: Droplet, placeholder: "O+" },
        ],
    },
    {
        title: "Contact & care",
        rows: [
            { key: "phone", label: "Phone", icon: Phone, placeholder: "+91 98765 43210" },
            { key: "address", label: "Address", icon: MapPin, placeholder: "123 Main Street, Mumbai, India" },
            { key: "allergies", label: "Allergies", icon: AlertTriangle, placeholder: "Peanuts", flag: true },
             { key: "Vaccination", label: "Vaccination", icon: Syringe , placeholder: " DTaP/Tdap " },
              { key: "surgeriesPrior", label: "surgeriesPrior", icon:   Scissors , placeholder: " Cholecystectomy " },
            { key: "emergency", label: "Emergency contact", icon: Phone, placeholder: "Rohan Singh · +91 98111 22334" },
            { key: "nextAppointment", label: "Next appointment", icon: Calendar, placeholder: "Dr. Mehta · Cardiology · Sat, 14 Sept · 10:30 AM" },
        ],
    },
];

export default function AddPatientModal({ onAddPatient, onClose }) {
    const [draft, setDraft] = useState(EMPTY_PATIENT);
    const [savedNotice, setSavedNotice] = useState(false);

    function updateField(key, value) {
        setDraft((d) => ({ ...d, [key]: value }));
    }
    function handleClose() {
    setDraft({ ...EMPTY_PATIENT });
    setSavedNotice(false);
    onClose?.();
}

    function handleSubmit(e) {
        e.preventDefault();
        if (!draft.name.trim()) return;

        onAddPatient?.(draft);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    }
function handleClear() {
    setDraft({ ...EMPTY_PATIENT });
    setSavedNotice(false);
}
    const isEmpty = !draft.name && !draft.email && !draft.phone;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 font-body"
            style={{ background: COLORS.overlay }}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose?.();
            }}  >


            <div
                className="modal-enter relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
                style={{ background: COLORS.bg, color: COLORS.ink }}
                role="dialog"
                aria-modal="true"
                aria-label="Add a patient"
            >
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full"
                    style={{ background: "rgba(29,43,40,0.06)", color: COLORS.inkMuted }}
                >
                    <X size={16} />
                </button>

                <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-1 pr-8">
                        <h1 className="font-display text-[26px] leading-tight text-bold" style={{ color: COLORS.teal }}>
                            Add Patient
                        </h1>
                        {savedNotice && (
                            <span
                                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full mt-1"
                                style={{ background: "#E4EFE9", color: COLORS.tealDeep }}
                                role="status"
                            >
                                <Check size={13} />
                                Patient added
                            </span>
                        )}
                    </div>


                    {/* =================== live preview id card ============== */}
                    <div
                        className="card-enter relative rounded-2xl overflow-hidden mb-8"
                        style={{ background: `linear-gradient(155deg, ${COLORS.teal}, ${COLORS.tealDeep})` }}
                    >
                        <Heart
                            size={140}
                            strokeWidth={1}
                            className="absolute -right-6 -bottom-8 pointer-events-none"
                            style={{ color: "rgba(255,255,255,0.06)" }}
                            aria-hidden="true"
                        />

                        <div className="relative flex flex-col sm:flex-row">
                            <div className="flex sm:flex-col items-center sm:items-start gap-4 p-6 sm:gap-5 sm:w-[42%]">
                                <div
                                    className="w-16 h-16 rounded-full border-4 border-gray-700 mb-2 flex items-center justify-center shrink-0"
                                    style={{ background: "rgba(255,255,255,0.1)" }}
                                >
                                    <UserPlus size={24} style={{ color: "#B9CFC9" }} />
                                </div>
                                <div>
                                    <p className="font-display text-xl text-white leading-none mb-1.5">
                                        {draft.name || "New patient"}
                                    </p>
                                    <p className="text-xs" style={{ color: "#B9CFC9" }}>
                                        {draft.email || "no email yet"}
                                    </p>
                                </div>
                            </div>

                            <div className="relative hidden sm:block w-px" style={{ background: "rgba(255,255,255,0.22)" }}>
                                <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full" style={{ background: COLORS.bg }} />
                                <span className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full" style={{ background: COLORS.bg }} />
                            </div>
                            <div className="block sm:hidden mx-6 h-px" style={{ background: "rgba(255,255,255,0.22)" }} />

                            <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-6 flex-1">
                                <Stat label="Member ID" value={draft.memberId || "—"} />
                                <Stat label="Member since" value={draft.memberSince || "—"} />
                                <Stat label="Date of birth" value={draft.dob || "—"} />

                                <div>
                                    <p className="text-[11px] mb-1" style={{ color: "#9DB8B1" }}>
                                        Blood group
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                        <Droplet size={13} style={{ color: COLORS.amber }} fill={COLORS.amber} />
                                        <span className="text-sm font-medium text-white">{draft.bloodGroup || "—"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ======================= form ============== */}
                    <form onSubmit={handleSubmit}>
                        {FORM_SECTIONS.map((section) => (
                            <div
                                key={section.title}
                                className="rounded-2xl px-6 py-2 mb-6"
                                style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }}
                            >
                                <h2 className="font-display text-lg pt-5 pb-3" style={{ color: COLORS.ink }}>
                                    {section.title}
                                </h2>

                                {section.rows.map((row) => {
                                    const Icon = row.icon;
                                    return (
                                        <div
                                            key={row.key}
                                            className="flex items-center gap-4 py-4"
                                            style={{ borderTop: `1px solid ${COLORS.line}` }}
                                        >
                                            <Icon size={20} style={{ color: COLORS.inkMuted }} className="shrink-0" />

                                            <label
                                                htmlFor={`field-${row.key}`}
                                                className="text-sm w-40 font-medium shrink-0"
                                                style={{ color: COLORS.ink }}
                                            >
                                                {row.label}
                                            </label>

                                            <input
                                                type="text"
                                                id={`field-${row.key}`}
                                                className="field-input"
                                                placeholder={row.placeholder}
                                                value={draft[row.key]}
                                                onChange={(e) => updateField(row.key, e.target.value)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}

                        <div className="flex items-center gap-2 justify-end mb-2">
                            <button
                                type="button"
                                 onClick={handleClear}
                                disabled={isEmpty}
                                className="text-sm font-semibold px-4 py-2 text-white  rounded-full  bg-[#307970] hover:bg-[#1F433C]"
                            
                            >
                                Clear
                            </button>


                            
                            <button
                                type="submit"
                                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full text-white bg-[#307970] hover:bg-[#1F433C]"
                            
                            >
                                <UserPlus size={15} />
                                Add patient
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
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