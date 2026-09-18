"use client";
import React, { useState } from "react";
import Sidebar from "../../../../components/Admin/Sidebar/Sidebar";
import { Headerss } from "../../../../Common/Header";
import { COLORS } from "../../../../Common/Colors";
import {
    Mail,
    Phone,
    Pencil,
    Check,
    X,
    Lock,
    Activity,
    Building2,
    IdCard,
    Clock,
} from "lucide-react";

const INITIAL_ADMIN = {
    name: "Alex Morgan",
    role: "Super admin - platform operations",
    email: "alex.morgan@clinicops.com",
    employeeId: "ADM-0142",
    department: "Platform ops",
    lastLogin: "Today, 08:41",
    fields: {
        phone: "+1 (555) 019-2234",
        officeLocation: "HQ - Floor 4",
    },
    permissions: [
        { label: "User management", granted: true },
        { label: "Billing", granted: true },
        { label: "Audit logs", granted: true },
        { label: "System config", granted: false },
    ],
    security: {
        twoFactor: true,
        accountActive: true,
    },
};

const FIELD_ROWS = [
    { key: "phone", label: "Phone", icon: Phone },
    { key: "officeLocation", label: "Office location", icon: Building2 },
];

export default function AdminProfilePage() {
    const [admin, setAdmin] = useState(INITIAL_ADMIN);
    const [draft, setDraft] = useState(INITIAL_ADMIN.fields);
    const [editing, setEditing] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);

    function startEdit() {
        setDraft(admin.fields);
        setEditing(true);
        setSavedNotice(false);
    }

    function cancelEdit() {
        setDraft(admin.fields);
        setEditing(false);
    }

    function saveEdit() {
        setAdmin((a) => ({ ...a, fields: draft }));
        setEditing(false);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    }

    return (
        <div
            className="flex h-screen  w-full overflow-hidden"
            style={{ background: COLORS.bg2, color: COLORS.ink2, fontFamily: "'Inter', system-ui, sans-serif" }}  >
            <Sidebar admin={admin} />
            {/* ======================== header ================== */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Headerss admin={admin} />
                {/* ======              content ================= */}
                <main className="p-6 md:p-10">
                    <div className="mx-auto max-w-3xl">

                        {/* ---- heading ---- */}
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <h1 className="text-[26px] font-semibold leading-tight" style={{ color: COLORS.ink2 }}>
                                {admin.name}
                            </h1>
                            {savedNotice && (
                                <span
                                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full mt-1"
                                    style={{ background: COLORS.signalTint, color: COLORS.signalTintInk }}
                                    role="status"
                                >
                                    <Check size={13} />
                                    Saved
                                </span>
                            )}
                        </div>

                        {/* ---- credential card ---- */}
                        <div
                            className="relative rounded-2xl overflow-hidden mb-6"
                            style={{ background: `linear-gradient(155deg, ${COLORS.graphite}, ${COLORS.graphiteDeep})` }}
                        >

                            <div className="relative flex items-center gap-4 p-6">
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                                    style={{ background: "rgba(201,150,47,0.18)", border: "2px solid rgba(255,255,255,0.15)" }}
                                >

                                    <img
                                        src="/GIRL.png"
                                        alt={admin.name}
                                        className="w-9 h-9 rounded-full"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-lg font-medium text-white leading-none mb-1.5">{admin.name}</p>
                                    <p className="text-xs" style={{ color: "#C9AEB2" }}>
                                        {admin.role}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={startEdit}
                                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full shrink-0"
                                    style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
                                >
                                    <Pencil size={13} />
                                    Edit
                                </button>
                            </div>

                            <div className="relative grid grid-cols-3 gap-3 px-6 pb-6">
                                <Stat icon={IdCard} label="Employee ID" value={admin.employeeId} mono />
                                <Stat icon={Building2} label="Department" value={admin.department} />
                                <Stat icon={Clock} label="Last login" value={admin.lastLogin} mono />
                            </div>
                        </div>

                        {/* ---- contact ---- */}
                        <div
                            className="rounded-2xl px-6 py-2 mb-6"
                            style={{ background: COLORS.card, border: `1px solid ${COLORS.line2}` }}
                        >
                            <div className="flex items-center justify-between pt-5 pb-3">
                                <h2 className="text-base font-semibold" style={{ color: COLORS.ink2 }}>
                                    Contact
                                </h2>
                                {editing && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="flex items-centertext-[#5B6472] gap-1 text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-red-900 hover:text-white"
                                            style={{ border: `1px solid ${COLORS.line2}` }}
                                        >
                                            <X size={13} />
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={saveEdit}
                                            className="flex items-center text-[#8A6414] gap-1 text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-red-900 hover:text-white"
                                            style={{ border: `1px solid ${COLORS.signal}`}}
                                        >
                                            <Check size={13} />
                                            Save changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4 py-4" style={{ borderTop: `1px solid ${COLORS.line2}` }}>
                                <Mail size={20} style={{ color: COLORS.inkMuted2 }} className="shrink-0" />
                                <span className="text-sm w-40 font-medium shrink-0" style={{ color: COLORS.ink2 }}>
                                    Email
                                </span>
                                <span className="text-sm" style={{ color: COLORS.inkMuted2 }}>
                                    {admin.email}
                                </span>
                            </div>

                            {FIELD_ROWS.map((row) => {
                                const Icon = row.icon;
                                const value = editing ? draft[row.key] : admin.fields[row.key];
                                return (
                                    <div key={row.key} className="flex items-center gap-4 py-4" style={{ borderTop: `1px solid ${COLORS.line2}` }}>
                                        <Icon size={20} style={{ color: COLORS.inkMuted2 }} className="shrink-0" />
                                        <label
                                            htmlFor={`field-${row.key}`}
                                            className="text-sm w-40 font-medium shrink-0"
                                            style={{ color: COLORS.ink2 }}
                                        >
                                            {row.label}
                                        </label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                id={`field-${row.key}`}
                                                className="flex-1 text-sm rounded-lg px-3 py-2"
                                                style={{ border: `1px solid ${COLORS.line2}`, background: COLORS.bg2, color: COLORS.ink2 }}
                                                value={draft[row.key]}
                                                onChange={(e) => setDraft((d) => ({ ...d, [row.key]: e.target.value }))}
                                            />
                                        ) : (
                                            <span className="text-sm" style={{ color: COLORS.inkMuted2 }}>
                                                {value}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* ---- permissions ---- */}
                        <div
                            className="rounded-2xl px-6 py-6 mb-6"
                            style={{ background: COLORS.card, border: `1px solid ${COLORS.line2}` }}  >
                            <h2 className="text-base font-semibold mb-4" style={{ color: COLORS.ink2 }}>
                                Permissions
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {admin.permissions.map((p) => (
                                    <span
                                        key={p.label}
                                        className="text-xs font-medium px-3 py-1.5 rounded-full"
                                        style={
                                            p.granted
                                                ? { background: COLORS.signalTint, color: COLORS.signalTintInk }
                                                : { background: COLORS.bg2, color: COLORS.inkFaint2 }
                                        }
                                    >
                                        {p.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* ---- security ---- */}
                        <div
                            className="rounded-2xl px-6 py-2"
                            style={{ background: COLORS.card, border: `1px solid ${COLORS.line2}` }}  >
                            <h2 className="text-base font-semibold pt-5 pb-3" style={{ color: COLORS.ink2 }}>
                                Security
                            </h2>
                            <SecurityRow icon={Lock} label="Two-factor authentication" active={admin.security.twoFactor} />
                            <SecurityRow icon={Activity} label="Account status" active={admin.security.accountActive} activeLabel="Active" inactiveLabel="Inactive" />
                        </div>
                    </div>

                </main>
            </div>


        </div>
    );
}

function Stat({ icon: Icon, label, value, mono }) {
    return (
        <div>
            <p className="text-[11px] mb-1 flex items-center gap-1" style={{ color: "#A88E92" }}>
                <Icon size={11} />
                {label}
            </p>
            <p
                className="text-sm font-medium text-white"
                style={mono ? { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" } : undefined}
            >
                {value}
            </p>
        </div>
    );
}

function SecurityRow({ icon: Icon, label, active, activeLabel = "Enabled", inactiveLabel = "Disabled" }) {
    return (
        <div className="flex items-center justify-between py-3.5" style={{ borderTop: `1px solid ${COLORS.line2}` }}>
            <span className="text-sm flex items-center gap-2" style={{ color: COLORS.inkMuted2 }}>
                <Icon size={16} />
                {label}
            </span>
            <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={
                    active
                        ? { background: COLORS.successTint, color: COLORS.success }
                        : { background: COLORS.bg2, color: COLORS.inkFaint2 }
                }
            >
                {active ? activeLabel : inactiveLabel}
            </span>
        </div>
    );
}