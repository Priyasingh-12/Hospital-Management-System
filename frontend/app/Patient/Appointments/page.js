"use client";
import { useState } from "react";
import { Plus, Filter, ArrowUpDown, LayoutGrid, Table2, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

const tabs = ["Today", "Upcoming", "Past"];

export default function AppointmentPage() {

  const [activeTab, setActiveTab] = useState("Today");
  const [view, setView] = useState("table");
  const [pageSize, setPageSize] = useState(10);

  return (

        <main className="p-6 space-y-4">
          {/* ==============  top row ============ */}
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2 rounded-md shadow-sm transition-colors">
              <Plus size={18} strokeWidth={2.5} />
              Schedule
            </button>

            <div>
              {tabs.map((tab) =>(
                <button key={tab} className={`px-5 py-2 text-sm font-medium transition-colors 
                ${activeTab === tab ? "bg-blue-500 text-white" : "text-gray-500 hover:bg-gray-50"}
                `}>
                  {tab}
                </button>
              ))
                
              }
            </div>

          </div>

          {/* ============= view  toggle ============ */}
          <div className="flex items-center gap-2">
            <button onClick={() => setView("table")} className={`p-2 rounded-md ${view === 'table' ? "bg-emerald-800 text-white" : "bg-gray-100 text-gray-500"}`}>
                 <Table2 size={18} />
            </button>
            <button onClick={() => setView("table")} className={`p-2 rounded-md ${ view === "grid" ? "bg-emerald-800 text-white" : "bg-gray-100 text-gray-500"}`}> <LayoutGrid size={18} /></button>
          </div>

          {/* ============== table card =========== */}
          <div className="rounded-md bg-white shadow-md border border-gray-100 overflow-hidden  ">
            <table className="w-full text-left                ">
              <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-1">
                    Doctor <ArrowUpDown size={14} className="text-black-900" />
                  </span>
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  <Filter size={14} className="text-gray-400" />
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  <span className="inline-flex items-center gap-1">
                    Appointment Time <ArrowUpDown size={14} className="text-black-900" />
                  </span>
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-black-900">Reason</th>
              </tr>
            </thead>
            <tbody> <tr >
               <td colSpan={4}  className="px-6 py-6 text-sm text-gray-500  ">    
              No appointment found.</td>
              </tr></tbody>
            </table>
            
            {/* ============= pregress bar ========== */}
          <div className="px-6 pb-2">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-emerald-500 rounded-full" />
            </div>
          </div>

          {/* ============== footer ============ */}
          <div className="flex items-center justify-between px-6 py-4 text-sm text-gray-500">
            <div className="flex items-center gap-3">
               <button className="hover:text-gray-700 disabled:opacity-40" disabled>
                  <ChevronsLeft size={16} />
               </button>
               <button className="hover:text-gray-700 disabled:opacity-40" disabled> <ChevronLeft size={16} /></button>
               <span>Showing 0 to 0 of 0 entries</span>
               <button className="hover:text-gray-700 disabled:opacity-40" disabled>
                <ChevronRight size={16} />
              </button>
              <button className="hover:text-gray-700 disabled:opacity-40" disabled>
                <ChevronsRight size={16} />
              </button>
            </div>

             <select  value={pageSize}   onChange={(e) => setPageSize(Number(e.target.value))} 
             className="border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>

             </select>
          </div>

          </div>

        </main>

  )
}
