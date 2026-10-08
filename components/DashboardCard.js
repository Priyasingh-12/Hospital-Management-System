
import {
    CheckCircle,
    ClipboardMinus,
    Trash2,
    Download,
} from "lucide-react";


export default function DashboardCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-gray-800">
        {value}
      </h2>

      <p className="mt-2 text-sm text-green-500">
        +12% from last month
      </p>
    </div>
  );
}

// =======================appointment ==================
export function Appointments() {
  const appointments = [
    {
      doctor: "Dr. Jens Brincker",
      department: "Endocrinologist",
      date: "23 June '20",
      time: "04:00-05:00",
      treatment: "Diabetes",
      phone: "+123 45678345",
    }, {
      doctor: "Dr. John Doe",
      department: "Cardiologist",
      date: "13 June '20",
      time: "11:00-11:30",
      treatment: "Heart Checkup",
      phone: "+123 434656764",
    },
    {
      doctor: "Dr. Cara Stevens",
      department: "Radiologist",
      date: "12 June '20",
      time: "09:00-10:00",
      treatment: "CT Scans",
      phone: "+123 676545655",
    },
    {
      doctor: "Dr. Airi Satou",
      department: "Otolaryngologist",
      date: "12 June '20",
      time: "09:15-10:15",
      treatment: "Diseases Of The Ear",
      phone: "+123 45345673",
    },
    {
      doctor: "Dr. Angelica Ramos",
      department: "Dentist",
      date: "12 June '20",
      time: "11:00-12:00",
      treatment: "Root Canal",
      phone: "+123 87654533",
    },
    {
      doctor: "Dr. william ponting",
      department: "Endocrinologist",
      date: "23 June '20",
      time: "04:00-05:00",
      treatment: "Diabetes",
      phone: "+123 45678345",
    },
    {
      doctor: "Dr. Ashur",
      department: "derma",
      date: "23 June '20",
      time: "04:00-05:00",
      treatment: "skin",
      phone: "+123 45678345",
    },
    {
      doctor: "Dr. nikky",
      department: "gynologist",
      date: "23 June '20",
      time: "04:00-05:00",
      treatment: "overy",
      phone: "+123 45678345",
    }
  ]
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {/* ======tabs======== */}
      <div className="mb-5 flex border-b">
        <button className="w-1/2 pb-4 font-semibold border-b-2 border-blue-300 text-green-950">Upcoming Appointment</button>
        <button className="w-1/2 pb-4 font-semibold text-green-950">Past Appointment</button>
      </div>

      {/*  ============ appointment */}
      <div className="space-y-3">
        {appointments.map((appointment, index) => {
          return (
            <div
              key={index}
              className="grid items-center gap-4 rounded-xl bg-gray-50 p-4 md:grid-cols-[1.5fr_1fr_1.2fr_1.4fr_auto]"
            >

              {/* Doctor */}

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                  {appointment.doctor
                    .split(" ")
                    .slice(1)
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>

                  <p className="font-semibold text-xs text-gray-700">
                    {appointment.doctor}
                  </p>

                  <p className="text-xs text-gray-400">
                    {appointment.department}
                  </p>

                </div>

              </div>

              {/* Date */}

              <div>

                <p className="font-semibold text-gray-700 text-xs">
                  {appointment.date}
                </p>

                <p className="text-xs text-gray-400">
                  {appointment.time}
                </p>

              </div>

              {/* Treatment */}

              <div>

                <p className="text-xs text-gray-400">
                  Treatment
                </p>

                <p className="font-semibold text-xs text-gray-700">
                  {appointment.treatment}
                </p>

              </div>

              {/* Phone */}

              <div>

                <p className="text-xs text-gray-400">
                  Contact Number
                </p>

                <p className="font-semibold text-xs text-gray-700">
                  {appointment.phone}
                </p>

              </div>

              {/* Status */}

              <div className="text-green-500">
                ✓
              </div>

            </div>

          )
        })}
      </div>
    </div>
  )

}




// ===================  report ==================
export function Reports() {
  const reports = [
    "Blood Report",
    "Mediclaim Documents",
    "Doctor Prescription",
    "X-Ray Files",
    "Urine Report",
    "Scanning Documents",
  ];
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="flex mb-6 items-center justify-between">
        <h2 className="text-l font-bold text-green-950">  Reports/Documents</h2>
        <button className="font-semibold text-blue-600"> View All</button>
      </div>
      <div className="space-y-4">
        {reports.map((report, index) => {
          return (
            <div className="flex items-center justify-between rounded-xl border border-dashed border-gray-300 p-4" key={index}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-lg bg-blue-50 text-blue-500 "><ClipboardMinus className="h-9 w-9  " color="#eedddd" /></div>
                <span className="font-medium text-green-950 text-xs font-semibold ">  {report}</span>
              </div>
              <div className="flex gap-3 text-green-950">
                <button className="hover:text-red-500">   <Trash2 size={20}/></button>
                <button className="hover:text-blue-500 ">  <Download size={20}/></button>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}



