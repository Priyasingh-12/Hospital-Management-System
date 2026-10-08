"use client";
import React, { useState } from "react";
import { COLORS } from "../../../Common/Colors";
import { useDebounce } from "../../../Common/hooks/useDebounce";
import { CalendarPlus, Download, Search, SlidersHorizontal, ExternalLink, MoreHorizontal } from "lucide-react";
import { doctorMeta, apptStatusMeta, counts, initialAppointments, TABS, getDateContainer } from "../../../Common/DoctorDashboardData";

const COLS = "110px 2fr 1fr 120px 90px";
const COL_GAP = "34px"; // space between Appointment Time, Patient, Type, Status, Actions

export default function DoctorAppointment() {

  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("today");
  const [appointments] = useState(initialAppointments);

  const debouncedQuery = useDebounce(query, 300)
  // =================== filter ================

  const filtered = appointments.filter((item) => {
    const category = getDateContainer(item.date);         // get appointment category
    if (category !== tab) {                               // Filter by Today, Upcoming, or Past 
      return false
    }

    if (!debouncedQuery.trim()) return true;
    const q = debouncedQuery.toLowerCase().trim();
    return (
      item.patient.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    )

  });


  return (
    <div className="flex h-screen w-full"
      style={{ background: COLORS.bg0, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <main className="p-5 md:p-6 w-full">

        <div className="flex items-center gap-3 ">
          <button
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
            style={{ background: COLORS.PastelTurquoise, color: "#28282B" }}
          >
            <CalendarPlus size={14} />
            New appointment
          </button>
          <button
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium"
            style={{ background: COLORS.card, color: COLORS.ink, border: `1px solid ${COLORS.line}` }}
          >
            <Download size={14} />
            Export
          </button>
        </div>
        {/* ==================== table card ========================== */}
        <div className="rounded-2xl overflow-hidden w-full mt-4" style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }}>
          {/* =========== today upcoming and past ============= */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-6 pt-5 pb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {TABS.map((t) => {
                const activeTab = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className="rounded-full px-4 py-2 text-sm font-medium"
                    style={{
                      background: activeTab ? COLORS.navyDeep : COLORS.bg,
                      color: activeTab ? "#fff" : COLORS.inkMuted1,
                    }}
                  >
                    {t.label} ({counts[t.key]})
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2 w-64"
                style={{ background: COLORS.bg, border: `1px solid ${COLORS.line}` }}
              >
                <Search size={15} color={COLORS.inkFaint} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search patient or type"
                  className="bg-transparent outline-none text-sm w-full"
                  style={{ color: COLORS.ink }}
                />
              </div>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-xl"
                style={{ background: COLORS.card, border: `1px solid ${COLORS.line}` }}
              >
                <SlidersHorizontal size={14} color={COLORS.inkMuted1} />
              </button>
            </div>

          </div>

          {/* ============================== table header ================ */}
          <div className="grid w-full px-6 py-2 text-[11px] font-medium uppercase tracking-wide"
            style={{
              color: COLORS.inkFaint,
              borderTop: `1px solid ${COLORS.line}`,
              borderBottom: `1px solid ${COLORS.line}`,
              gridTemplateColumns: COLS,
              columnGap: COL_GAP,
            }} >
            <span>Appointment Time</span>
            <span>Patient</span>
            <span>Type</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          {/* ===================== row ============ */}

          {
            filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <div className="w-11 h-11 rounded-xl items-center flex justify-center mb-3" style={{ background: COLORS.bg }}>
                  <Search size={16} color={COLORS.inkFaint} />
                </div>
                <p className="text-sm font-medium" style={{ color: COLORS.ink }}>No matching appointments</p>
                <p className="text-xs mt-1" style={{ color: COLORS.inkFaint }}>Try a different name or clear your search.</p>
              </div>
            ) : (

              filtered.map((item, index) => {
                const st = apptStatusMeta[item.status];
                return (
                  <div key={item.id}
                    className="grid items-center w-full px-6 py-4"
                    style={{
                      gridTemplateColumns: COLS,
                      columnGap: COL_GAP,
                      borderBottom: index === filtered.length - 1 ? "none" : `1px solid ${COLORS.line}`,
                    }}
                  >
                    <div>
                      <p className="font-medium text-sm" style={{ color: COLORS.gold }}>{item.time}</p>
                      <p className="text-xs" style={{ color: COLORS.inkFaint }}>{item.duration}</p>
                    </div>
                    {/*  ======== patient name ========= */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate" style={{ color: COLORS.ink }}> {item.patient}</p>
                        {item.flag && (
                          <span className="text-[10px] font-medium rounded-full shrink-0 px-1.5 py-0.5"
                            style={{ background: COLORS.redTint, color: COLORS.red }}>
                            {item.flag}
                          </span>
                        )}
                      </div>
                      <p className="text-sm truncate" style={{ color: COLORS.inkFaint }} >   {item.meta}</p>
                    </div>
                    {/* ============= type ======= */}
                    <p className="text-sm" style={{ color: COLORS.inkMuted1 }}>  {item.type}</p>
                    {/* ===status ===== */}
                    <span className="text-xs font-medium px-2.5 py-1 w-fit rounded-full" style={{
                      background: st.bg,
                      color: st.color,
                    }}>  {st.label}</span>
                    {/* ============ action =========== */}
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg"
                        style={{
                          background: COLORS.bg,
                          border: `1px solid ${COLORS.line}`,
                        }}>
                        <ExternalLink
                          size={13}
                          color={COLORS.inkMuted1}
                        />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg"
                        style={{
                          background: COLORS.bg,
                          border: `1px solid ${COLORS.line}`,
                        }}>
                        <MoreHorizontal
                          size={13}
                          color={COLORS.inkMuted1}
                        />
                      </button>
                    </div>



                  </div>
                )

              })

            )
          }

        </div>

      </main>
    </div>
  )
}



// =========================================
    {/* -------- pagination -------- */}
            // <div className="flex items-center justify-between px-6 py-4" style={{ borderTop: `1px solid ${COLORS.line}` }}>
            //   <p className="text-xs" style={{ color: COLORS.inkFaint }}>
            //     Showing {filtered.length} of {appointments.length} appointments
            //   </p>
            //   <div className="flex items-center gap-2">
            //     <button
            //       className="text-sm font-medium px-4 py-2 rounded-lg"
            //       style={{ background: COLORS.bg, color: COLORS.inkMuted1, border: `1px solid ${COLORS.line}` }}
            //     >
            //       Previous
            //     </button>
            //     <button
            //       className="text-sm font-medium px-4 py-2 rounded-lg"
            //       style={{ background: COLORS.bg, color: COLORS.inkMuted1, border: `1px solid ${COLORS.line}` }}
            //     >
            //       Next
            //     </button>
            //   </div>
            // </div>
