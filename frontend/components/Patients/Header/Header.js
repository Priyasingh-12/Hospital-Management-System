import React from 'react'

const patient = {
  name: "Priya Singh",
  role: "PATIENT",
  bloodGroup: "O+",
  country: "India",
  visits: "120+",
  medications: "80+",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marshal",
};

export default function Header() {
  return (
    <div>
          {/* ============== header =================== */}
            <header className="flex items-center justify-end bg-blue-200 px-6 py-4 shadow-sm">

                <div className="flex items-center gap-5">
                    <button className="bg-red-400 hover:bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-md">
                        Logout
                    </button>
                    <span className="font-medium text-gray-700">{patient.name}</span>
                    <img
                        src="/GIRL.png"
                        alt={patient.name}
                        className="w-9 h-9 rounded-full"
                    />
                </div>
            </header> 
    </div>
  )
}
