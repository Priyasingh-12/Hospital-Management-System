"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, CalendarPlus } from "lucide-react";
import { COLORS } from "../../../Common/Colors";

// Local YYYY-MM-DD (avoids the UTC shift you get from toISOString)
export const toLocalDateStr = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

// "14:30" -> "2:30 PM"
const to12h = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};

const TYPES = ["Consultation", "Follow-up", "Post-op check", "ECG review", "Stress test"];
const DURATIONS = ["15 min", "20 min", "30 min", "45 min", "60 min"];
const FLAGS = ["", "Allergy", "Diabetic", "Anxious", "Urgent"];
const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
];

const emptyForm = () => ({
  patient: "",
  age: "",
  sex: "F",
  mrn: "",
  date: toLocalDateStr(),
  time: "09:00",
  duration: "30 min",
  type: "Consultation",
  status: "pending",
  flag: "",
});

export default function NewAppointmentModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const firstFieldRef = useRef(null);

  // Reset + focus when opened, Esc to close, lock body scroll
  useEffect(() => {
    if (!open) return;
    setForm(emptyForm());
    setErrors({});
    const t = setTimeout(() => firstFieldRef.current?.focus(), 0);
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.patient.trim()) er.patient = "Enter the patient's name.";
    const age = Number(form.age);
    if (!form.age || !Number.isInteger(age) || age < 0 || age > 120) er.age = "Enter an age from 0 to 120.";
    if (!form.mrn.trim()) er.mrn = "Enter the MRN.";
    else if (!/^\d{3,8}$/.test(form.mrn.trim())) er.mrn = "MRN should be 3–8 digits.";
    if (!form.date) er.date = "Pick a date.";
    if (!form.time) er.time = "Pick a time.";
    return er;
  };

  const handleSubmit = () => {
    const er = validate();
    if (Object.keys(er).length) {
      setErrors(er);
      return;
    }
    onCreate({
      id: `a${Date.now()}`,
      date: form.date,
      time: to12h(form.time),
      duration: form.duration,
      patient: form.patient.trim(),
      meta: `${form.age}${form.sex} · MRN ${form.mrn.trim()}`,
      flag: form.flag || null,
      type: form.type,
      status: form.status,
    });
    onClose();
  };

  const inputStyle = (key) => ({
    background: COLORS.bg,
    color: COLORS.ink,
    border: `1px solid ${errors[key] ? COLORS.red : COLORS.line}`,
  });
  const inputCls = "w-full rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-offset-0";

  const Label = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-xs font-medium mb-1.5" style={{ color: COLORS.inkMuted1 }}>
      {children}
    </label>
  );
  const Error = ({ k }) =>
    errors[k] ? (
      <p className="text-xs mt-1" style={{ color: COLORS.red }}>
        {errors[k]}
      </p>
    ) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(15, 23, 42, 0.45)" }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-appt-title"
        className="w-full sm:max-w-lg max-h-[92vh] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: COLORS.PastelTurquoise }}>
              <CalendarPlus size={16} color="#28282B" />
            </div>
            <div>
              <h2 id="new-appt-title" className="text-base font-semibold" style={{ color: COLORS.ink }}>
                New appointment
              </h2>
              <p className="text-xs" style={{ color: COLORS.inkFaint }}>
                Book a patient into your schedule
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ background: COLORS.bg, border: `1px solid ${COLORS.line}` }}
          >
            <X size={14} color={COLORS.inkMuted1} />
          </button>
        </div>

        {/* body */}
        <div className="px-6 py-5 overflow-y-auto space-y-4">
          <div>
            <Label htmlFor="patient">Patient name</Label>
            <input
              id="patient"
              ref={firstFieldRef}
              value={form.patient}
              onChange={set("patient")}
              placeholder="e.g. Grace Okafor"
              className={inputCls}
              style={inputStyle("patient")}
            />
            <Error k="patient" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="age">Age</Label>
              <input
                id="age"
                type="number"
                min="0"
                max="120"
                value={form.age}
                onChange={set("age")}
                placeholder="52"
                className={inputCls}
                style={inputStyle("age")}
              />
              <Error k="age" />
            </div>
            <div>
              <Label htmlFor="sex">Sex</Label>
              <select id="sex" value={form.sex} onChange={set("sex")} className={inputCls} style={inputStyle("sex")}>
                <option value="F">Female</option>
                <option value="M">Male</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="mrn">MRN</Label>
              <input
                id="mrn"
                inputMode="numeric"
                value={form.mrn}
                onChange={set("mrn")}
                placeholder="8821"
                className={inputCls}
                style={inputStyle("mrn")}
              />
              <Error k="mrn" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date">Date</Label>
              <input id="date" type="date" value={form.date} onChange={set("date")} className={inputCls} style={inputStyle("date")} />
              <Error k="date" />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <input id="time" type="time" value={form.time} onChange={set("time")} className={inputCls} style={inputStyle("time")} />
              <Error k="time" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="type">Appointment type</Label>
              <select id="type" value={form.type} onChange={set("type")} className={inputCls} style={inputStyle("type")}>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <select id="duration" value={form.duration} onChange={set("duration")} className={inputCls} style={inputStyle("duration")}>
                {DURATIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="flag">Patient flag (optional)</Label>
              <select id="flag" value={form.flag} onChange={set("flag")} className={inputCls} style={inputStyle("flag")}>
                {FLAGS.map((f) => (
                  <option key={f} value={f}>
                    {f || "None"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="block text-xs font-medium mb-1.5" style={{ color: COLORS.inkMuted1 }}>
                Status
              </span>
              <div className="flex gap-2">
                {STATUSES.map((s) => {
                  const active = form.status === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, status: s.value }))}
                      className="flex-1 rounded-xl px-3 py-2.5 text-sm font-medium"
                      style={{
                        background: active ? COLORS.navyDeep : COLORS.bg,
                        color: active ? "#fff" : COLORS.inkMuted1,
                        border: `1px solid ${active ? COLORS.navyDeep : COLORS.line}`,
                      }}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4" style={{ borderTop: `1px solid ${COLORS.line}` }}>
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-medium"
            style={{ background: COLORS.card, color: COLORS.ink, border: `1px solid ${COLORS.line}` }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
            style={{ background: COLORS.PastelTurquoise, color: "#28282B" }}
          >
            <CalendarPlus size={14} />
            Book appointment
          </button>
        </div>
      </div>
    </div>
  );
}