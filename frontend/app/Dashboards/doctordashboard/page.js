"use client";
import React, { useState} from "react";
import { Headers } from "../../../Common/Header";
import { COLORS } from "../../../Common/Colors";
import Sidebar from "../../../components/Doctors/Sidebar/Sidebar";
import { useDebounce } from "../../../Common/hooks/useDebounce";
import { Video, Building2, ChevronRight, CalendarPlus, Star, FileText, Search, Pill, Check, X } from "lucide-react";
import { doctor, stats, initialSchedule, statusMeta, recentPatients } from "../../../Common/DoctorDashboardData";

// ============================== group by status ================

function groupByStatus(list) {
  return {
    current: list.filter((i) => i.status === "current"),
    upcoming: list.filter((i) => i.status === "upcoming"),
    done: list.filter((i) => ["completed", "no-show", "cancelled"].includes(i.status))
  }
}

export default function DoctorDashboard() {
  const [query, setQuery] = useState("");
  const [schedule, setSchedule] = useState(initialSchedule);
  const [available, setAvailable] = useState(true);

const debouncedQuery =  useDebounce(query, 300)
  // ======================== set status =============
  const setStatus = (id, status) =>
    setSchedule((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));

  // ====================== FILTER ==============
  const filtered = schedule.filter((item) => {
    if (!debouncedQuery.trim()) return true;
    const q = debouncedQuery.toLowerCase();
    return (
      item.patient.toLowerCase().includes(q) ||
      item.reason.toLowerCase().includes(q)
    );
  });
  const group = groupByStatus(filtered);

  return (
    <div
      className="flex h-screen"
      style={{ background: COLORS.bg0, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* ===================== SIDEBAR ============ */}
      <Sidebar doctor={doctor} />

      {/* ===================== main ============ */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Headers doctor={doctor} />

        {/* ===================== HEADER ROW ===================== */}
        <div className="flex p-5 md:p-4 flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
          <div>
            <h1 className="text-2xl font-semibold  " style={{ color: COLORS.navyDeep }}>{doctor.name}</h1>
          </div>

          <div className="flex items-center gap-3  ">
            {/* ========== search ========== */}
            <div className="flex items-center gap-2 rounded-xl px-3 py-2 w-64"
              style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }} >
              <Search size={15} color={COLORS.inkFaint} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search patients or reason"
                className="bg-transparent outline-none text-sm w-full"
                style={{ color: COLORS.ink }}
              />
            </div>
            {/* ============= availability toggle ====== */}
            <button onClick={() => setAvailable((v) => !v)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium"
              style={{
                background: available ? COLORS.greenTint : COLORS.bg,
                color: available ? COLORS.green : COLORS.inkMuted1,
                border: `1px solid ${COLORS.line}`,
              }}><span className="w-2 h-2 rounded-full" style={{ background: available ? COLORS.green : COLORS.inkFaint }} />
              {available ? "Available" : "Away"}</button>

          </div>
        </div>
        {/* ======================== quick action ============== */}
        <div className="flex flex-wrap gap-6 mb-8 p-1">
          {
            [
              { label: "New appointment", icon: CalendarPlus , bg: COLORS.PastelTurquoise},
              { label: "Write prescription", icon: Pill ,bg: COLORS.PastelTurquoise},
              { label: "Open patient record", icon: FileText,bg: COLORS.PastelTurquoise},
            ].map((a) => {
              const Icon = a.icon;
              return (
                <button key={a.label} className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
                  style={{ background: a.bg, color: "#28282B" }} >
                  <Icon size={14} />
                  {a.label}
                </button>
              )
            })
          }

        </div>

        <main className="p-5 md:p-3">
          {/* ============ stat cards ========= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl p-5"
                  style={{ background: s.bg, border: `1px solid ${COLORS.line}` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm" style={{ color: COLORS.inkMuted1 }}>{s.label}</p>
                    <div
                      className="w-7 h-7 items-center justify-center rounded-lg flex"
                      style={{ background: "rgba(255,255,255,0.6)" }}
                    >
                      <Icon size={14} color={COLORS.ink} />
                    </div>
                  </div>
                  <p className="font-display text-[28px] leading-none mb-1.5" style={{ color: COLORS.ink }}>
                    {s.value}
                  </p>
                  <p className="text-[15px]" style={{ color: COLORS.inkMuted1 }}>{s.sub}</p>
                </div>
              );
            })}
          </div>

           <div className="flex flex-col gap-6">
              {/* =================== today schedule ============ */}

              <div className="rounded-2xl px-6 py-5" style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold" style={{ color: COLORS.ink1 }}>Today&apos;s Schedule</h2>
                  <button className="flex items-center text-xs font-medium gap-1" style={{ color: COLORS.goldTintInk }}>
                    View calendar
                    <ChevronRight size={13} />
                  </button>
                </div>
                {filtered.length === 0 ? (<div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="w-11 h-11 rounded-xl items-center flex justify-center mb-3" style={{ background: COLORS.bg }}>
                    <Search size={16} color={COLORS.inkFaint} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: COLORS.ink }}>No matching appointments</p>
                  <p className="text-xs mt-1" style={{ color: COLORS.inkFaint }}>Try a different name or clear your search.</p>
                </div>) : (
                  <>
                    {group.current.length > 0 && (
                      <ScheduleGroup title="Now" items={group.current} onStatus={setStatus} />
                    )}
                    {group.upcoming.length > 0 && (
                      <ScheduleGroup title="Upcoming" items={group.upcoming} onStatus={setStatus} />
                    )}
                    {group.done.length > 0 && (
                      <ScheduleGroup title="Completed" items={group.done} onStatus={setStatus} muted />
                    )}
                  </>
                )}

              </div>

              <div>

              </div>

            </div>
          {/* ===================== RECENT PATIENTS ===================== */}
          <div className="rounded-2xl px-6 py-5 h-fit" style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.ink1 }}>Recent Patients</h2>
            <div className="flex flex-col gap-4">
              {recentPatients.map((p) => (
                <div key={p.name + p.date} className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg" style={{ background: COLORS.goldTint, color: COLORS.gold }}>
                    <FileText size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate" style={{ color: COLORS.ink }}>{p.name}</p>
                      {p.rating && (
                        <span className="flex items-center gap-0.5 text-sm" style={{ color: COLORS.inkFaint }}>
                          <Star size={11} fill={COLORS.gold} color={COLORS.gold} />
                          {p.rating}
                        </span>
                      )}
                    </div>
                    <p className="text-sm truncate" style={{ color: COLORS.inkFaint }}>{p.note} · {p.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </main>
      </div>
    </div>
  );
}

// =========================  ScheduleGroup ===========
function ScheduleGroup({ title, onStatus, muted, items }) {
  return (
    <div className="mb-2">
      <p className="text-[11px] font-medium uppercase tracking-wide mb-1 mt-3" style={{ color: COLORS.inkFaint }}>
        {title}
      </p>
      <div>
        {items.map((item, index) => {
          const st = statusMeta[item.status];
          return (
            <div key={item.id}
              className="flex items-center gap-10 py-3.5"
              style={{ borderTop: index === 0 ? "none" : `1px solid ${COLORS.line}`, opacity: muted ? 0.7 : 1 }} >
              <span className="font-medium text-sm w-14 shrink-0" style={{ color: item.status === "current" ? COLORS.gold : COLORS.inkFaint }}>
                {item.time}    </span>
              <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full " style={{ background: COLORS.bg, color: COLORS.inkMuted1 }} >
                {item.mode === "video" ? <Video size={14} /> : <Building2 size={14} />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium truncate" style={{ color: COLORS.ink }} > {item.patient}</p>
                  {item.flag && (
                    <span className=" text-[10px] font-medium rounded-full shrink-0 px-1.5 py-0.5" style={{ background: COLORS.redTint, color: COLORS.red }} >
                      {item.flag === "allergy" ? "Allergy" : "Urgent"}
                    </span>
                  )}
                </div>
                <p className="text-sm truncate" style={{ color: COLORS.inkFaint }} >{item.reason}</p>
              </div>

              { item.status === "upcoming" || item.status === "current" ? (
                   <div className="flex items-center gap-2 shrink-0 ">
                <button onClick={() => onStatus(item.id, "completed")} title="Mark completed"
                  className=" w-7 h-7 flex items-center justify-center rounded-lg "
                  style={{ background: COLORS.greenTint, color: COLORS.green }} >
                  <Check size={13} />
                </button>
                <button onClick={() => onStatus(item.id, "no show")} title="Mark no-show"
                  className=" w-7 h-7 flex items-center justify-center rounded-lg "
                  style={{ background: COLORS.redTint, color: COLORS.red }}
                >
                  <X size={13} />
                </button>
              </div>
              ) : (
                 <span className=" font-medium px-2.5 py-1 shrink-0 rounded-full [16px] " style={{ background: st.bg, color: st.color }}>
                {st.label}
              </span>
              )}

            </div>
          )
        })
        }
      </div>

    </div>

  )
}