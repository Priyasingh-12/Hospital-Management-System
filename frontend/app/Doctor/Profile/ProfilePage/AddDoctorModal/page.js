"use client";
import React, { useState } from "react";
import "../../../../../components/Doctors/Profile/Profile.css";
import { COLORS } from "../../../../../Common/Colors";
import {
    Stethoscope,
    User,
    Calendar,
    Phone,
    MapPin,
    Award,
    Languages,
    GraduationCap,
    BadgeCheck,
    UserPlus,
    Check,
    X,
} from "lucide-react";

const EMPTY_DOCTOR = {
    name: "",
    email: "",
    role: "",
    licenseNo: "",
    registeredSince: String(new Date().getFullYear()),
    experience: "",
    phone: "",
    clinicAddress: "",
    specialization: "",
    qualifications: "",
    languages: "",
    consultationFee: "",
    about: "",
};

const FORM_SECTIONS = [
    {
        title: "Identity",
        rows: [
            { key: "name", label: "Full name", icon: User, placeholder: "Dr. Jane Smith" },
            { key: "email", label: "Email", icon: User, placeholder: "jane@clinic.com" },
            { key: "role", label: "Role / Title", icon: Award, placeholder: "Cardiologist, MBBS MD" },
            { key: "licenseNo", label: "License no.", icon: BadgeCheck, placeholder: "LIC-00123" },
            { key: "registeredSince", label: "Registered since", icon: Calendar, placeholder: "2015" },
            { key: "experience", label: "Experience", icon: Award, placeholder: "8 years" },
        ],
    },
    {
        title: "Contact & practice",
        rows: [
            { key: "phone", label: "Phone", icon: Phone, placeholder: "+1 (555) 123-4567" },
            { key: "clinicAddress", label: "Clinic address", icon: MapPin, placeholder: "221B Baker Street" },
            { key: "specialization", label: "Specialization", icon: Stethoscope, placeholder: "Cardiology", flag: true },
            { key: "qualifications", label: "Qualifications", icon: GraduationCap, placeholder: "MBBS, MD" },
            { key: "languages", label: "Languages spoken", icon: Languages, placeholder: "English, Spanish" },
            { key: "consultationFee", label: "Consultation fee", icon: Award, placeholder: "$50" },
        ],
    },
];

export default function AddDoctorModal({ onAddDoctor, onClose }) {
    const [draft, setDraft] = useState(EMPTY_DOCTOR);
    const [savedNotice, setSavedNotice] = useState(false);

    function updateField(key, value) {
        setDraft((d) => ({ ...d, [key]: value }));
    }

    function handleClose() {
        setDraft({ ...EMPTY_DOCTOR });
        setSavedNotice(false);
        onClose?.();
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!draft.name.trim()) return;

        onAddDoctor?.(draft);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    }

    function handleClear() {
        setDraft({ ...EMPTY_DOCTOR });
        setSavedNotice(false);
    }

    const isEmpty = !draft.name && !draft.email && !draft.phone;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 font-body"
            style={{ background: COLORS.overlay }}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div
                className="modal-enter relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
                style={{ background: COLORS.bg, color: COLORS.ink }}
                role="dialog"
                aria-modal="true"
                aria-label="Add a doctor"
            >
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full"
                    style={{ background: "rgba(27,36,48,0.06)", color: COLORS.inkMuted }}
                >
                    <X size={16} />
                </button>

                <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-1 pr-8">
                        <h1 className="font-display text-[26px] leading-tight text-bold" style={{ color: COLORS.navy }}>
                            Add Doctor
                        </h1>
                        {savedNotice && (
                            <span
                                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full mt-1"
                                style={{ background: COLORS.goldTint, color: COLORS.goldTintInk }}
                                role="status"
                            >
                                <Check size={13} />
                                Doctor added
                            </span>
                        )}
                    </div>

                    {/* =================== live preview credential card ============== */}
                    <div
                        className="card-enter relative rounded-2xl overflow-hidden mb-8"
                        style={{ background: `linear-gradient(155deg, ${COLORS.navy}, ${COLORS.navyDeep})` }}
                    >
                        <Stethoscope
                            size={140}
                            strokeWidth={1}
                            className="absolute -right-6 -bottom-8 pointer-events-none"
                            style={{ color: "rgba(201,164,101,0.10)" }}
                            aria-hidden="true"
                        />

                        <div className="relative flex flex-col sm:flex-row">
                            <div className="flex sm:flex-col items-center sm:items-start gap-4 p-6 sm:gap-5 sm:w-[42%]">
                                <div
                                    className="w-16 h-16 rounded-full border-4 border-gray-700 mb-2 flex items-center justify-center shrink-0"
                                    style={{ background: "rgba(255,255,255,0.1)" }}
                                >
                                    <UserPlus size={24} style={{ color: "#B7C0CC" }} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <p className="font-display text-xl text-white leading-none">
                                            {draft.name || "New doctor"}
                                        </p>
                                        <BadgeCheck size={15} style={{ color: COLORS.gold }} />
                                    </div>
                                    <p className="text-xs" style={{ color: "#B7C0CC" }}>
                                        {draft.role || "role not set"}
                                    </p>
                                    <p className="text-xs mt-0.5" style={{ color: "#8593A4" }}>
                                        {draft.email || "no email yet"}
                                    </p>
                                </div>
                            </div>

                            <div className="relative hidden sm:block w-px" style={{ background: "rgba(255,255,255,0.16)" }}>
                                <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full" style={{ background: COLORS.bg }} />
                                <span className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full" style={{ background: COLORS.bg }} />
                            </div>
                            <div className="block sm:hidden mx-6 h-px" style={{ background: "rgba(255,255,255,0.16)" }} />

                            <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-6 flex-1">
                                <Stat label="License no." value={draft.licenseNo || "—"} />
                                <Stat label="Registered since" value={draft.registeredSince || "—"} />
                                <Stat label="Experience" value={draft.experience || "—"} />
                                <Stat label="Consultation fee" value={draft.consultationFee || "—"} />
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

                        <div
                            className="rounded-2xl px-6 py-2 mb-6"
                            style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }}
                        >
                            <h2 className="font-display text-lg pt-5 pb-3" style={{ color: COLORS.ink }}>
                                About
                            </h2>
                            <div className="pb-5">
                                <textarea
                                    className="field-input w-full resize-none"
                                    style={{ minHeight: 90, paddingTop: 10 }}
                                    placeholder="Short professional bio…"
                                    value={draft.about}
                                    onChange={(e) => updateField("about", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 justify-end mb-2">
                            <button
                                type="button"
                                onClick={handleClear}
                                disabled={isEmpty}
                                className="text-sm font-semibold px-4 py-2 rounded-full"
                                style={{ color: COLORS.goldTintInk, border: `1px solid ${COLORS.gold}`, background: COLORS.goldTint }}
                            >
                                Clear
                            </button>

                            <button
                                type="submit"
                                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full text-white"
                                style={{ background: COLORS.navy }}
                            >
                                <UserPlus size={15} />
                                Add doctor
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
            <p className="text-[11px] mb-1" style={{ color: "#8593A4" }}>
                {label}
            </p>
            <p className="text-sm font-medium text-white">{value}</p>
        </div>
    );
}