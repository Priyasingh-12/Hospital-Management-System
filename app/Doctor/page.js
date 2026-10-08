
"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, CalendarPlus } from "lucide-react";
import { COLORS } from "../../Common/Colors";
import { TYPES, DURATIONS, FLAGS, STATUSES } from "../../Common/DoctorDashboardData";


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


export default function NewAppointmentModal() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const FieldRef = useRef(null);
  // ====================== css for input ===============
    const inputCls = "w-full rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-offset-0";

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
            // onClick={onClose}
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
            <label htmlFor="patient">Patient name</label>
            <input
              id="patient"
                ref={FieldRef}
              value={form.patient}
              onChange={(e) =>
                setForm({
                  ...form,
                  patient: e.target.value,
                })
              }
              placeholder="e.g. Grace Okafor"
              className={inputCls}
            //   style={inputStyle("patient")}
            />
            {/* <Error k="patient" /> */}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                min="0"
                max="120"
                  ref={FieldRef}
                value={form.age}
                onChange={(e) =>
                  setForm({
                    ...form,
                    age: e.target.value,
                  })
                }
                placeholder="52"
               className={inputCls}
              // style={inputStyle("age")}
              />
              {/* <Error k="age" /> */}
            </div>
            <div>
              <label htmlFor="sex">Sex</label>
              <select id="sex"
                ref={FieldRef}
              //    value={form.sex} onChange={set("sex")} className={inputCls} style={inputStyle("sex")}
              >
                <option value="F">Female</option>
                <option value="M">Male</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="mrn">MRN</label>
              <input
                id="mrn"
                // inputMode="numeric"
                value={form.mrn}
                  ref={FieldRef}
                onChange={(e) =>
                  setForm({
                    ...form,
                    mrn: e.target.value,
                  })
                }
                placeholder="8821"
               className={inputCls}
              // style={inputStyle("mrn")}
              />
              {/* <Error k="mrn" /> */}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="date">Date</label>
              <input id="date" type="date"
                ref={FieldRef}
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value,
                  })
                }
               className={inputCls}
              //  style={inputStyle("date")} 
              />
              {/* <Error k="date" /> */}
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <input id="time" type="time"
                value={form.time}
                  ref={FieldRef}
                onChange={(e) =>
                  setForm({
                    ...form,
                    time: e.target.value,
                  })
                }
                className={inputCls}
                //  style={inputStyle("time")}
              />
              {/* <Error k="time" /> */}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="type">Appointment type</label>
              <select id="type"
                value={form.type}
                  ref={FieldRef}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
                className={inputCls} 
                // style={inputStyle("type")}
              >
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="duration">Duration</label>
              <select id="duration"
                value={form.duration}
                  ref={FieldRef}
                onChange={(e) =>
                  setForm({
                    ...form,
                    patient: e.target.value,
                  })
                }
              className={inputCls} 
              // style={inputStyle("duration")} 
              >
                {DURATIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="flag">Patient flag (optional)</label>
              <select id="flag"
                value={form.flag}
                
                onChange={(e) =>
                  setForm({
                    ...form,
                    patient: e.target.value,
                  })
                }
              className={inputCls}
              //  style={inputStyle("flag")}
              >
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
                  // const active = form.status === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, status: s.value }))}
                      className="flex-1 rounded-xl px-3 py-2.5 text-sm font-medium"
                      style={{
                        // background: active ? COLORS.navyDeep : COLORS.bg,
                        // color: active ? "#fff" : COLORS.inkMuted1,
                        // border: `1px solid ${active ? COLORS.navyDeep : COLORS.line}`,
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
            // onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-medium"
            style={{ background: COLORS.card, color: COLORS.ink, border: `1px solid ${COLORS.line}` }}
          >
            Cancel
          </button>
          <button
            // onClick={handleSubmit}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
            style={{ background: COLORS.PastelTurquoise, color: "#28282B" }}
          >
            <CalendarPlus size={14} />
            Book appointment
          </button>
        </div>
      </div>
    </div>
  )
}
