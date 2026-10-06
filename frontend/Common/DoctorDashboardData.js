import { Users, Stethoscope, MapPin,Award, Languages,Phone,CalendarClock ,Star,AlertCircle , Clock3 , FileText} from "lucide-react";
import { COLORS} from "../Common/Colors";

export const doctor = {
  name: "Dr. Kavita Sharma",
  initials: "KS",
  specialty: "Cardiology",
  role: "Cardiologist · Apollo Wing B",
  email: "kavita.sharma@careteam.in",
  licenseNo: "MCI-45213-DL",
  registeredSince: "2011",
 experiences: "14+ yrs",
  consultationFee: "₹1,200",
  fields: {
    phone: "+91 98450 11223",
    clinicAddress: "Suite 402, Lotus Heart Institute, Bandra West, Mumbai",
    specialization: "Cardiology · Interventional",
    qualifications: "MBBS, MD (Cardiology), DM",
    languages: "English, Hindi, Marathi",
  },
  todaysSchedule: "14 patients today · Next: Arjun Mehta, 11:00 AM · OPD Room 3",
  about:
    "Dr. Kavita Sharma is a highly experienced Interventional Cardiologist with a focus on preventive heart care and minimally invasive procedures. Her practice blends evidence-based treatment with time spent on lifestyle counselling, so patients leave with a plan, not just a prescription.",
  education: [
    { degree: "DM in Cardiology", institution: "All India Institute of Medical Sciences, Delhi" },
    { degree: "MD in Internal Medicine", institution: "Grant Medical College, Mumbai" },
    { degree: "MBBS", institution: "Seth G.S. Medical College, Mumbai" },
  ],
  experience: [
    "14+ years of clinical experience in interventional cardiology",
    "Performed over 1,200 angioplasty and stenting procedures",
    "Led the cardiac catheterization unit at Lotus Heart Institute since 2018",
    "Regular visiting consultant for rural cardiac screening camps",
  ],
  certificates: [
    "Board Certified Interventional Cardiologist",
    "Fellow of the Indian College of Cardiology (FICC)",
    "Advanced Cardiac Life Support (ACLS) — recertified 2025",
  ],
  memberships: [
    "Cardiological Society of India",
    "Indian Medical Association",
    "European Society of Cardiology (International Fellow)",
  ],
  focusAreas: [
    "Angioplasty & Stenting",
    "Preventive Cardiology",
    "Heart Failure Management",
    "Pediatric Cardiac Screening",
    "Post-MI Rehabilitation",
  ],
  ratings: {
    average: 4.9,
    count: 312,
    breakdown: [
      { stars: 5, pct: 82 },
      { stars: 4, pct: 12 },
      { stars: 3, pct: 4 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 1 },
    ],
  },
  testimonials: [
    {
      quote:
        "Dr. Sharma explained my angioplasty in plain language and checked in the next morning herself. That mattered more than I expected.",
      author: "Rohit K.",
      note: "Angioplasty, Aug 2026",
    },
    {
      quote:
        "First cardiologist who spent real time on my father's lifestyle plan instead of just adjusting the prescription.",
      author: "Sunita M.",
      note: "Heart failure follow-up, Jul 2026",
    },
  ],
};

export const FIELD_ROWS = [
  { key: "phone", label: "Phone", icon: Phone },
  { key: "clinicAddress", label: "Clinic address", icon: MapPin },
  { key: "specialization", label: "Specialization", icon: Stethoscope, flag: true },
  { key: "qualifications", label: "Qualifications", icon: Award },
  { key: "languages", label: "Languages spoken", icon: Languages },
];

export const stats = [
  { label: "Today's appointments", value: "12", sub: "3 remaining", icon: CalendarClock , bg: COLORS.indigo },
  { label: "Active patients", value: "184", sub: "+6 this week", icon: Users ,bg: COLORS.rose},
  { label: "Pending reports", value: "4", sub: "2 due today", icon: FileText ,bg: COLORS.pale},
  { label: "Avg. Wait Time", value: "9m", sub: "-2m vs last week", icon: Clock3,bg: COLORS.blue},
];
export const initialSchedule = [
  { id: 1, time: "09:00", patient: "Ravi Deshmukh", reason: "Follow-up · Hypertension", mode: "in-person", status: "completed" },
  { id: 2, time: "09:30", patient: "Lena Ford", reason: "New patient consult", mode: "video", status: "completed" },
  { id: 3, time: "10:15", patient: "Grace Okafor", reason: "Post-op check", mode: "in-person", status: "current", flag: "allergy" },
  { id: 4, time: "11:00", patient: "Marcus Webb", reason: "Chest pain review", mode: "video", status: "upcoming", flag: "urgent" },
  { id: 5, time: "11:45", patient: "Priya Nair", reason: "Annual physical", mode: "in-person", status: "upcoming" },
];
export const recentPatients = [
  { name: "Rohan Mehta", note: "BP stable at 128/82, continue current dosage", time: "Today" },
  { name: "Leela Nair", note: "ECG unremarkable, next review in 3 months", time: "Today" },
  { name: "Sanjay Verma", note: "Referred to endocrinology for thyroid panel", time: "Yesterday" },
];

 export const statusStyle = {
  done: { label: "Completed", color: COLORS.inkFaint, bg: "transparent" },
  current: { label: "In progress", color: COLORS.goldTintInk, bg: COLORS.goldTint },
  upcoming: { label: "Upcoming", color: COLORS.inkMuted1, bg: COLORS.bg },
};
export const notifications = [
  { id: 1, type: "result", text: "Lab results ready for Marcus Webb", time: "12m ago" },
  { id: 2, type: "alert", text: "Grace Okafor flagged: penicillin allergy on file", time: "1h ago" },
  { id: 3, type: "message", text: "Priya Nair sent a message about her prescription", time: "2h ago" },
];
export const statusMeta = {
  completed: { label: "Completed", bg: COLORS.greenTint, color: COLORS.green },
  current: { label: "In progress", bg: COLORS.goldTint, color: COLORS.gold },
  upcoming: { label: "Upcoming", bg: COLORS.bg, color: COLORS.inkMuted1 },
  "no-show": { label: "No-show", bg: COLORS.redTint, color: COLORS.red },
  cancelled: { label: "Cancelled", bg: COLORS.bg, color: COLORS.inkFaint },
};