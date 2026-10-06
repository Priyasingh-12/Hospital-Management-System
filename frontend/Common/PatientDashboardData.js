import { Phone, MapPin, ShieldCheck, AlertTriangle } from "lucide-react";

export const patient = {
  name: "Priya Singh",
  role: "PATIENT",
  bloodGroup: "O+",
  country: "India",
  visits: "120+",
  medications: "80+",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marshal",
};
export const INITIAL_PATIENT = {
    name: "Priya Singh",
    role: "Patient",
    email: "priyasingh82001@gmail.com",
    memberId: "MC-08421-IN",
    memberSince: "2019",
    bloodGroup: "O+",
    dob: "15 May 1990",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marshal",
    fields: {
        phone: "+91 98765 43210",
        address: "123 Main Street, Mumbai, India",
        aadhar: "1234 5678 9012",
        allergies: "Peanuts",
        emergency: "Rohan Singh · +91 98111 22334",
    },
    nextAppointment: "Dr. Mehta · Cardiology · Sat, 14 Sept · 10:30 AM",
};

export const FIELD_ROWS = [
    { key: "phone", label: "Phone", icon: Phone },
    { key: "address", label: "Address", icon: MapPin },
    { key: "aadhar", label: "Aadhar no.", icon: ShieldCheck },
    { key: "allergies", label: "Allergies", icon: AlertTriangle, flag: true },
    { key: "emergency", label: "Emergency contact", icon: Phone },
];



export const appointments = [
  { firstName: "Priya", lastName: "Singh", date: "14 May 2025", time: "3:30 PM", reason: "Fracture" },
  { firstName: "Priya", lastName: "Singh", date: "30 June 2025", time: "4:30 PM", reason: "General Consultation" },
  { firstName: "Priya", lastName: "Singh", date: "23 June 2025", time: "1:52 PM", reason: "Prescription Refill" },
];
export const medications = [
  { name: "Dolo", dose: "200mg", schedule: "0-1-1" },
  { name: "Paracetamol", dose: "500mg", schedule: "Twice a day" },
  { name: "Cough Syrup", dose: "10ml", schedule: "Thrice a day" },
  { name: "PCM", dose: "500mg", schedule: "1-1-1" },
];
export  const medicineDose = [
  { name: "Metformin", dose: "500mg", schedule: "2:00 PM" }

]
 export const documents = [
  { title: "Blood Test Report", date: "Aug 12, 2025", type: "Lab Result", url: "/docs/blood-test.pdf" },
  { title: "Prescription - Dr. Smith", date: "Jul 28, 2025", type: "Prescription", url: "/docs/prescription1.pdf" },
  { title: "Discharge Summary", date: "Jun 15, 2025", type: "Summary", url: "/docs/discharge.pdf" },
];

export const ALERTS = [
  { text: "Peanut allergy on file — flag before any new prescription.", level: "warn" },
  { text: "Annual bloodwork due in 9 days.", level: "info" },
];