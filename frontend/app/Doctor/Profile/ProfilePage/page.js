"use client";
import React, { useState, useRef, useEffect } from "react";
import "../../../../components/Doctors/Profile/Profile.css";
import { COLORS } from "../../../../Common/Colors";
import { INITIAL_DOCTOR } from "../../../../Common/INITIAL_DOCTOR";
import { FIELD_ROWS } from "../../../../Common/DoctorDashboardData";

import {
  Award,
  Languages,
  Phone,
  Clock,
  Pencil,
  Check,
  X,
  Download,
  BadgeCheck,
  CalendarClock,
  GraduationCap,
  FileBadge,
  Users,
  MoreHorizontal,
  Star,
} from "lucide-react";


export default function DoctorProfilePage() {
  const [doctor, setDoctor] = useState(INITIAL_DOCTOR);
  const [draft, setDraft] = useState(INITIAL_DOCTOR.fields);
  const [editing, setEditing] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const noticeTimeout = useRef(null);

  useEffect(() => {
    return () => clearTimeout(noticeTimeout.current);
  }, []);

  function startEdit() {
    setDraft(doctor.fields);
    setEditing(true);
    setSavedNotice(false);
  }

  function cancelEdit() {
    setDraft(doctor.fields);
    setEditing(false);
  }

  function saveEdit() {
    setDoctor((d) => ({ ...d, fields: draft }));
    setEditing(false);
    setSavedNotice(true);
    clearTimeout(noticeTimeout.current);
    noticeTimeout.current = setTimeout(() => setSavedNotice(false), 3000);
  }

  return (
    <main
      className="p-6 md:p-10"
      style={{ background: COLORS.bg1, color: COLORS.ink1, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="mx-auto max-w-3xl">
        {/* ---- heading ---- */}
        <div className="flex items-start justify-between gap-4 mb-1">
          <h1 className="font-display text-[28px] leading-tight" style={{ color: COLORS.ink }}>
            {INITIAL_DOCTOR.name}
          </h1>
          {savedNotice && (
            <span
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full mt-1"
              style={{ background: COLORS.goldTint, color: COLORS.goldTintInk }}
              role="status"
            >
              <Check size={13} />
              Saved
            </span>
          )}
        </div>
        {/* ---- today strip ---- */}
        <div
          className="flex items-center gap-3 text-sm mb-8 pb-6"
          style={{ borderBottom: `1px solid ${COLORS.line}`, color: COLORS.inkMuted1 }}
        >
          <CalendarClock size={15} style={{ color: COLORS.gold }} />
          <span>
            Today ·{" "}
            <span style={{ color: COLORS.ink1, fontWeight: 500 }}>{doctor.todaysSchedule}</span>
          </span>
        </div>

        {/* ---- focus areas ---- */}
        <div className="flex flex-wrap gap-2 mb-8">
          {doctor.focusAreas.map((area) => (
            <span
              key={area}
              className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ color: COLORS.navy, border: `1px solid ${COLORS.gold}`, background: COLORS.goldTint }}
            >
              {area}
            </span>
          ))}
        </div>

        {/* ---- credential card ---- */}
        <div
          className="relative rounded-2xl overflow-hidden mb-10"
          style={{ background: `linear-gradient(155deg, ${COLORS.navy}, ${COLORS.navyDeep})` }}
        >
          <div
            className="absolute -right-10 -bottom-12 pointer-events-none"
            aria-hidden="true"
            style={{ color: "rgba(201,164,101,0.10)" }}
          >
            <Award size={190} strokeWidth={0.7} />
          </div>

          <div className="absolute top-5 right-3 z-10 flex items-center gap-2">
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 rounded-full"
              style={{ background: "rgba(255,255,255,0.10)", color: "#fff", border: "1px solid rgba(255,255,255,0.22)" }}
              aria-label="Download credentials"
              title="Download credentials"
            >
              <Download size={14} />
            </button>
            <button
              type="button"
              onClick={startEdit}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.10)", color: "#fff", border: "1px solid rgba(255,255,255,0.22)" }}
            >
              <Pencil size={13} />
              Edit
            </button>
          </div>

          <div className="relative flex flex-col sm:flex-row">
            <div className="flex sm:flex-col items-center sm:items-start gap-4 p-7 sm:gap-5 sm:w-[44%]">
              <img
                src="/GIRL.png"
                alt={doctor.name}
                className="w-20 h-20 rounded-full border-4 border-gray-700 mb-3"
              />
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <p className="font-display text-2xl text-white leading-none">{doctor.name}</p>
                  <BadgeCheck size={17} style={{ color: COLORS.goldSoft }} aria-label="License verified" />
                </div>
                <p className="text-xs mb-1" style={{ color: "#B7C0CC" }}>
                  {doctor.role}
                </p>
                <p className="text-xs" style={{ color: "#8593A4" }}>
                  {doctor.email}
                </p>
              </div>
            </div>

            <div className="relative hidden sm:block w-px" style={{ background: "rgba(255,255,255,0.16)" }}>
              <span className="absolute -top-3 -left-3 w-6 h-6 rounded-full" style={{ background: COLORS.bg1 }} />
              <span className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full" style={{ background: COLORS.bg1 }} />
            </div>
            <div className="block sm:hidden mx-7 h-px" style={{ background: "rgba(255,255,255,0.16)" }} />

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-7 flex-1">
              <Stat label="License no." value={doctor.licenseNo} />
              <Stat label="Registered since" value={doctor.registeredSince} />
              <Stat label="Experience" value={INITIAL_DOCTOR.experiences} />

              <div>
                <p className="text-[11px] mb-1" style={{ color: "#8593A4" }}>
                  Consultation fee
                </p>
                <p className="text-sm font-medium text-white">{doctor.consultationFee}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---- professional information ---- */}
        <div
          className="rounded-2xl px-6 py-2"
          style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }}
        >
          <div className="flex items-center justify-between pt-5 pb-3">
            <h2 className="font-display text-lg" style={{ color: COLORS.ink1 }}>
              Professional information
            </h2>
            {editing && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full"
                  style={{ color: COLORS.inkMuted1, border: `1px solid ${COLORS.line}` }}
                >
                  <X size={13} />
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveEdit}
                  className="flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full"
                  style={{ color: COLORS.goldTintInk, border: `1px solid ${COLORS.gold}`, background: COLORS.goldTint }}
                >
                  <Check size={13} />
                  Save changes
                </button>
              </div>
            )}
          </div>

          {FIELD_ROWS.map((row) => {
            const Icon = row.icon;
            const value = editing ? draft[row.key] : doctor.fields[row.key];

            return (
              <div
                key={row.key}
                className="flex items-center gap-4 py-4"
                style={{ borderTop: `1px solid ${COLORS.line}` }}
              >
                <Icon size={20} style={{ color: COLORS.inkMuted1 }} className="shrink-0" />

                <label
                  htmlFor={`field-${row.key}`}
                  className="text-sm w-40 font-medium shrink-0"
                  style={{ color: COLORS.ink1 }}
                >
                  {row.label}
                </label>

                {editing ? (
                  <input
                    type="text"
                    id={`field-${row.key}`}
                    className="field-input"
                    value={draft[row.key]}
                    onChange={(e) => setDraft((d) => ({ ...d, [row.key]: e.target.value }))}
                  />
                ) : row.flag ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full"
                    style={{ background: COLORS.goldTint, color: COLORS.goldTintInk }}
                  >
                    {value}
                  </span>
                ) : (
                  <span className="text-sm" style={{ color: COLORS.inkMuted1 }}>
                    {value}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* ---- about ---- */}
        <div
          className="rounded-2xl px-6 py-6 mt-6"
          style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg" style={{ color: COLORS.ink1 }}>
              About
            </h2>
            <button
              type="button"
              aria-label="More options"
              className="flex items-center justify-center w-7 h-7 rounded-full"
              style={{ color: COLORS.inkFaint }}
            >
              <MoreHorizontal size={17} />
            </button>
          </div>

          <SectionLabel>Description</SectionLabel>
          <p className="text-sm leading-relaxed mb-7" style={{ color: COLORS.inkMuted1 }}>
            {doctor.about}
          </p>

          <SectionLabel>Education</SectionLabel>
          <div className="flex flex-col gap-4 mb-7">
            {doctor.education.map((item) => (
              <div key={item.degree} className="flex items-start gap-3">
                <IconBadge icon={GraduationCap} />
                <div>
                  <p className="text-sm font-medium" style={{ color: COLORS.ink1 }}>
                    {item.degree}
                  </p>
                  <p className="text-xs" style={{ color: COLORS.inkFaint }}>
                    {item.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <SectionLabel>Experience</SectionLabel>
          <ul className="mb-7 pl-0 flex flex-col gap-2.5">
            {doctor.experience.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-sm" style={{ color: COLORS.inkMuted1 }}>
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: COLORS.gold }}
                  aria-hidden="true"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <SectionLabel>Certificates</SectionLabel>
          <div className="flex flex-col gap-4 mb-7">
            {doctor.certificates.map((title) => (
              <div key={title} className="flex items-center gap-3">
                <IconBadge icon={FileBadge} />
                <p className="text-sm font-medium" style={{ color: COLORS.ink1 }}>
                  {title}
                </p>
              </div>
            ))}
          </div>

          <SectionLabel>Memberships</SectionLabel>
          <div className="flex flex-col gap-4">
            {doctor.memberships.map((title) => (
              <div key={title} className="flex items-center gap-3">
                <IconBadge icon={Users} />
                <p className="text-sm font-medium" style={{ color: COLORS.ink1 }}>
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- patient ratings ---- */}
        <div
          className="rounded-2xl px-6 py-6 mt-6"
          style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }}
        >
          <h2 className="font-display text-lg mb-5" style={{ color: COLORS.ink1 }}>
            Patient ratings
          </h2>

          <div className="flex flex-col sm:flex-row gap-8 mb-7">
            <div className="flex flex-col items-start shrink-0 sm:w-36">
              <p className="font-display text-[40px] leading-none" style={{ color: COLORS.ink1 }}>
                {doctor.ratings.average}
              </p>
              <div className="flex items-center gap-0.5 mt-2 mb-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    style={{ color: COLORS.gold }}
                    fill={i < Math.round(doctor.ratings.average) ? COLORS.gold : "none"}
                  />
                ))}
              </div>
              <p className="text-xs" style={{ color: COLORS.inkFaint }}>
                {doctor.ratings.count} patient reviews
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-2 justify-center">
              {doctor.ratings.breakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="text-xs w-3 shrink-0" style={{ color: COLORS.inkFaint }}>
                    {row.stars}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: COLORS.line }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.pct}%`, background: COLORS.gold }}
                    />
                  </div>
                  <span className="text-xs w-8 text-right shrink-0" style={{ color: COLORS.inkFaint }}>
                    {row.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {doctor.testimonials.map((t) => (
              <div
                key={t.author}
                className="rounded-xl p-4"
                style={{ background: COLORS.bg, border: `1px solid ${COLORS.line}` }}
              >
                <p className="text-sm leading-relaxed mb-2.5" style={{ color: COLORS.ink1 }}>
                  “{t.quote}”
                </p>
                <p className="text-xs" style={{ color: COLORS.inkFaint }}>
                  {t.author} · {t.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- availability note ---- */}
        <div className="flex items-center gap-3 text-xs mt-6" style={{ color: COLORS.inkFaint }}>
          <Clock size={13} />
          <span>OPD hours: Mon–Sat, 9:00 AM – 1:00 PM · Consultation timings are managed under Schedule.</span>
        </div>
      </div>
    </main>
  );
}

function SectionLabel({ children }) {
  return (
    <h3 className="text-sm font-semibold mb-3" style={{ color: COLORS.ink1 }}>
      {children}
    </h3>
  );
}

function IconBadge({ icon: Icon }) {
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: COLORS.goldTint, color: COLORS.gold }}
      aria-hidden="true"
    >
      <Icon size={17} strokeWidth={1.8} />
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