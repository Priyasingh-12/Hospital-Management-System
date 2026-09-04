"use client";
import React, { useState } from "react";
import { COLORS } from "../../../../../Common/Colors";
import {
    ShieldCheck,
    User,
    Mail,
    Phone,
    Building2,
    IdCard,
    Lock,
    Check,
    UserPlus,
    X,
} from "lucide-react";

const EMPTY_ADMIN = {
    name: "",
    email: "",
    role: "",
    employeeId: "",
    department: "",
    phone: "",
    officeLocation: "",
};

const PERMISSION_OPTIONS = ["User management", "Billing", "Audit logs", "System config"];

const FORM_SECTIONS = [
    {
        title: "Identity",
        rows: [
            { key: "name", label: "Full name", icon: User, placeholder: "Alex Morgan" },
            { key: "email", label: "Email", icon: Mail, placeholder: "alex.morgan@clinicops.com" },
            { key: "role", label: "Role / Title", icon: ShieldCheck, placeholder: "Super admin - platform operations" },
            { key: "employeeId", label: "Employee ID", icon: IdCard, placeholder: "ADM-0142" },
            { key: "department", label: "Department", icon: Building2, placeholder: "Platform ops" },
        ],
    },
    {
        title: "Contact",
        rows: [
            { key: "phone", label: "Phone", icon: Phone, placeholder: "+1 (555) 019-2234" },
            { key: "officeLocation", label: "Office location", icon: Building2, placeholder: "HQ - Floor 4" },
        ],
    },
];

export default function AddAdminModal({ onAddAdmin, onClose }) {
    const [draft, setDraft] = useState(EMPTY_ADMIN);
    const [permissions, setPermissions] = useState([]);
    const [twoFactor, setTwoFactor] = useState(true);
    const [savedNotice, setSavedNotice] = useState(false);
    const [error, setError] = useState("");

    function updateField(key, value) {
        setDraft((d) => ({ ...d, [key]: value }));
        if (error) setError("");
    }

    function togglePermission(label) {
        setPermissions((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));
    }

    function handleClose() {
        setDraft({ ...EMPTY_ADMIN });
        setPermissions([]);
        setTwoFactor(true);
        setSavedNotice(false);
        setError("");
        onClose?.();
    }

    function handleClear() {
        setDraft({ ...EMPTY_ADMIN });
        setPermissions([]);
        setTwoFactor(true);
        setSavedNotice(false);
        setError("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!draft.name.trim() || !draft.email.trim()) {
            setError("Enter a name and email to add this admin.");
            return;
        }

        onAddAdmin?.({
            ...draft,
            permissions: PERMISSION_OPTIONS.map((label) => ({ label, granted: permissions.includes(label) })),
            security: { twoFactor, accountActive: true },
        });
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    }

    const isEmpty = !draft.name && !draft.email && !draft.phone;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: COLORS.overlay, fontFamily: "'Inter', system-ui, sans-serif" }}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
                style={{ background: COLORS.bg2, color: COLORS.ink2 }}
                role="dialog"
                aria-modal="true"
                aria-label="Add an admin"
            >
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full"
                    style={{ background: "rgba(21,26,33,0.06)", color: COLORS.inkMuted2 }}
                >
                    <X size={16} />
                </button>

                <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-1 pr-8">
                        <h1 className="text-[26px] font-semibold leading-tight" style={{ color: COLORS.ink2 }}>
                            Add admin
                        </h1>
                        {savedNotice && (
                            <span
                                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full mt-1"
                                style={{ background: COLORS.signalTint, color: COLORS.signalTintInk }}
                                role="status"
                            >
                                <Check size={13} />
                                Admin added
                            </span>
                        )}
                    </div>

                    {/* =================== live preview credential card ============== */}
                    <div
                        className="relative rounded-2xl overflow-hidden mb-8"
                        style={{ background: `linear-gradient(155deg, ${COLORS.graphite}, ${COLORS.graphiteDeep})` }}
                    >
                        <ShieldCheck
                            size={140}
                            strokeWidth={0.7}
                            className="absolute -right-6 -bottom-8 pointer-events-none"
                            style={{ color: "rgba(201,150,47,0.12)" }}
                            aria-hidden="true"
                        />

                        <div className="relative flex items-center gap-4 p-6">
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                                style={{ background: "rgba(201,150,47,0.18)", border: "2px solid rgba(255,255,255,0.15)" }}
                            >
                                <UserPlus size={22} style={{ color: COLORS.signal }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-lg font-medium text-white leading-none mb-1.5">
                                    {draft.name || "New admin"}
                                </p>
                                <p className="text-xs" style={{ color: "#C9AEB2" }}>
                                    {draft.role || "role not set"}
                                </p>
                            </div>
                        </div>

                        <div className="relative grid grid-cols-2 gap-3 px-6 pb-6">
                            <div>
                                <p className="text-[11px] mb-1" style={{ color: "#A88E92" }}>Employee ID</p>
                                <p className="text-sm font-medium text-white" style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                                    {draft.employeeId || "—"}
                                </p>
                            </div>
                            <div>
                                <p className="text-[11px] mb-1" style={{ color: "#A88E92" }}>Department</p>
                                <p className="text-sm font-medium text-white">{draft.department || "—"}</p>
                            </div>
                        </div>
                    </div>

                    {/* ======================= form ============== */}
                    <form onSubmit={handleSubmit}>
                        {FORM_SECTIONS.map((section) => (
                            <div
                                key={section.title}
                                className="rounded-2xl px-6 py-2 mb-6"
                                style={{ background: COLORS.card, border: `1px solid ${COLORS.line2}` }}
                            >
                                <h2 className="text-base font-semibold pt-5 pb-3" style={{ color: COLORS.ink2}}>
                                    {section.title}
                                </h2>

                                {section.rows.map((row) => {
                                    const Icon = row.icon;
                                    return (
                                        <div
                                            key={row.key}
                                            className="flex items-center gap-4 py-4"
                                            style={{ borderTop: `1px solid ${COLORS.line2}` }}
                                        >
                                            <Icon size={20} style={{ color: COLORS.inkMuted2 }} className="shrink-0" />

                                            <label
                                                htmlFor={`field-${row.key}`}
                                                className="text-sm w-40 font-medium shrink-0"
                                                style={{ color: COLORS.ink2 }}
                                            >
                                                {row.label}
                                            </label>

                                            <input
                                                type="text"
                                                id={`field-${row.key}`}
                                                className="flex-1 text-sm rounded-lg px-3 py-2"
                                                style={{ border: `1px solid ${COLORS.line2}`, background: COLORS.bg2, color: COLORS.ink2 }}
                                                placeholder={row.placeholder}
                                                value={draft[row.key]}
                                                onChange={(e) => updateField(row.key, e.target.value)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}

                        {/* ---- permissions ---- */}
                        <div
                            className="rounded-2xl px-6 py-6 mb-6"
                            style={{ background: COLORS.card, border: `1px solid ${COLORS.line2}` }}
                        >
                            <h2 className="text-base font-semibold mb-4" style={{ color: COLORS.ink2 }}>
                                Permissions
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {PERMISSION_OPTIONS.map((label) => {
                                    const granted = permissions.includes(label);
                                    return (
                                        <button
                                            key={label}
                                            type="button"
                                            onClick={() => togglePermission(label)}
                                            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                                            style={
                                                granted
                                                    ? { background: COLORS.signalTint, color: COLORS.signalTintInk, border: `1px solid ${COLORS.signal}` }
                                                    : { background: COLORS.bg2, color: COLORS.inkFaint2, border: `1px solid ${COLORS.line2}` }
                                            }
                                        >
                                            {granted && <Check size={12} />}
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ---- security ---- */}
                        <div
                            className="rounded-2xl px-6 py-2 mb-6"
                            style={{ background: COLORS.card, border: `1px solid ${COLORS.line2}` }}
                        >
                            <h2 className="text-base font-semibold pt-5 pb-3" style={{ color: COLORS.ink2 }}>
                                Security
                            </h2>
                            <div className="flex items-center justify-between py-3.5" style={{ borderTop: `1px solid ${COLORS.line2}` }}>
                                <span className="text-sm flex items-center gap-2" style={{ color: COLORS.inkMuted2 }}>
                                    <Lock size={16} />
                                    Require two-factor authentication
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setTwoFactor((v) => !v)}
                                    aria-pressed={twoFactor}
                                    className="w-10 h-6 rounded-full relative shrink-0 transition-colors"
                                    style={{ background: twoFactor ? COLORS.signal : COLORS.line2 }}
                                >
                                    <span
                                        className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                                        style={{ left: twoFactor ? 18 : 2 }}
                                    />
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-xs mb-4 px-1" style={{ color: "#A32D2D" }}>
                                {error}
                            </p>
                        )}

                        <div className="flex items-center gap-2 justify-end mb-2">
                            <button
                                type="button"
                                onClick={handleClear}
                                disabled={isEmpty}
                                className="text-sm font-semibold px-4 py-2 rounded-full"
                                style={{ color: COLORS.signalTintInk, border: `1px solid ${COLORS.signal}`, background: COLORS.signalTint }}
                            >
                                Clear
                            </button>

                            <button
                                type="submit"
                                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full text-white"
                                style={{ background: COLORS.graphite }}
                            >
                                <UserPlus size={15} />
                                Add admin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}