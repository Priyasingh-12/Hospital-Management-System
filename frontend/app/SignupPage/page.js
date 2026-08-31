"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Stethoscope,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const ROLES = [
  {
    value: "patient",
    label: "Patient",
    desc: "Book visits and view your own records",
    icon: User,
  },
  {
    value: "doctor",
    label: "Doctor",
    desc: " Manage a patient list and daily schedule",
    icon: Stethoscope,
  }
];

// ============ EKG trace: one tile repeated to make a seamless scroll ============
const EKG_TILE_WIDTH = 140;
const EKG_TILE_POINTS = [
  [0, 30], [24, 30], [33, 30], [40, 10], [47, 46], [54, 4], [61, 30], [140, 30],
];
function buildEkgPath(tiles) {
  let d = "";
  for (let i = 0; i < tiles; i++) {
    const offset = i * EKG_TILE_WIDTH;
    EKG_TILE_POINTS.forEach(([x, y], idx) => {
      const cmd = i === 0 && idx === 0 ? "M" : "L";
      d += `${cmd}${x + offset},${y} `;
    });
  }
  return d.trim();
}
const EKG_TILES = 14;
const EKG_PATH = buildEkgPath(EKG_TILES);
const EKG_WIDTH = EKG_TILE_WIDTH * EKG_TILES;

export default function SignupPage() {

  const router = useRouter();
  const [step, setStep] = useState(1);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });


  // ========================== handle change ===========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for current field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // ================ continue function ==============
  const handleContinue = () => {
    if (!formData.role) {
      setErrors({ ...errors, role: "Choose an account type to continue", })
      return;
    }
    setStep(2);
  }

  // ====================== change role ============
  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));

    setErrors((prev) => ({
      ...prev,
      role: "",
    }));
  };
  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    // Stop if validation errors exist
    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      return;
    }

    // Start loading
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // Backend error
      if (!response.ok) {
        setErrors({
          name: "",
          email: data.message,
          password: "",
          confirmPassword: "",
        });

        return;
      }

      // Signup successful
      toast.success("Signup successful!");

      setTimeout(() => {
        // Go to login
        router.push("/LoginPage");
      }, 1000);



    } catch (error) {
      console.error("Signup error:", error);

      setErrors({
        name: "",
        email: "Unable to connect to server",
        password: "",
        confirmPassword: "",
      });

    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  // ===================== to find roles ==============

  const selectedRole = ROLES.find((roles) => roles.value === formData.role);


  return (
    <>
      <style>{`
        @keyframes ekg-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-${EKG_TILE_WIDTH}px); }
        }
      `}</style>

      <main className=" min-h-screen p-5 bg-[#F4F6F2]">
        <div className=" mx-auto flex min-h-[calc(100vh-40px)] max-w-6xl overflow-hidden rounded-[22px] bg-white shadow-2xl">
          {/* ================= left side =============== */}

          <section className=" relative  w-[45%]  bg-[#0E1F1B]  bg-[radial-gradient(circle_at_15%_8%,rgba(79,187,164,0.14),transparent_45%)]
      flex flex-col justify-between p-[44px] pb-[40px] overflow-hidden text-[#EFF4F1] " >
            <div>
              <h2 className="text-2xl font-medium">
                Medicare<span className="text-[#63C7AF] m-1">+</span>
              </h2>

              <div className="mt-7  rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-300">
                    Vitals monitor
                  </p>

                  {/* live indicator: Tailwind's built-in pulse animation */}
                  <span className="flex items-center gap-1.5 text-[10px] tracking-wide text-[#63C7AF]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#63C7AF] animate-pulse motion-reduce:animate-none" />
                    Live
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-2xl">72</p>
                    <p className="text-xs text-gray-400">
                      Heart rate
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl">98%</p>
                    <p className="text-xs text-gray-400">
                      SpO2
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl">118/76</p>
                    <p className="text-xs text-gray-400">
                      Blood pressure
                    </p>
                  </div>

                </div>
                {/* =================== EKG scroll animation ----------------- */}
                <div className="mt-5 h-11 overflow-hidden border-t border-white/10 pt-2.5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
                  <svg
                    className="animate-[ekg-scroll_5s_linear_infinite] motion-reduce:animate-none"
                    width={EKG_WIDTH}
                    height="34"
                    viewBox={`0 0 ${EKG_WIDTH} 34`}
                  >
                    <path
                      d={EKG_PATH}
                      fill="none"
                      stroke="#4FBBA4"
                      strokeWidth="1.75"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

              </div>
              <p className="mt-10 text-md uppercase tracking-widest text-[#63C7AF]">
                Hospital Management system
              </p>
              <h1 className="mt-3 max-w-md text-2xl font-medium leading-tight">
                One chart, every visit, every provider — always in sync.
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-green-100">
                Set up your account to book visits, manage a schedule,
                or run the front desk, depending on what you do here.
              </p>

            </div>
          </section>

          {/* ====================== right side ============ */}
          <section className="flex flex-1 items-center justify-center px-8 py-10">
            <div className="w-full max-w-md">
              <div className="mb-6 flex justify-between items-center">
                <span className=" text-[10.5px] tracking-[0.08em] uppercase text-[#6C7B75]"  >
                  Step {step} of 2 — {step === 1 ? "Account type" : " Your details"}
                </span>

                <div className="flex gap-2">
                  <div className="h-1 w-8 rounded bg-[#146B5D]" />
                  <div className={`h-1 w-8 rounded transition-colors duration-300 ${step === 2 ? "bg-[#146B5D]" : "bg-gray-200"}`} />
                </div>

              </div>

              {step === 1 && (
                <>
                  <h1 className="text-3xl font-medium text-[#0E1F1B]">
                    Who is signing up?
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                    Pick the account that matches what you wll use Medicare+
                    for.
                  </p>
                  {/* ================= role select ================ */}
                  <div className="mt-6 space-y-3">
                    {ROLES.map(({ value, label, desc, icon: Icon }) => {
                      const selected = formData.role === value;
                      return (
                        <button key={value}
                          type="button"
                          onClick={() => handleRoleSelect(value)}
                          className={`relative flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${selected
                            ? "border-[#146B5D] bg-[#E5EBE1]"
                            : "border-gray-200 bg-white hover:border-[#146B5D]"
                            }`}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E5EBE1] transition-colors duration-150">
                            <Icon size={20} />
                          </div>

                          <div>
                            <p className="font-semibold text-[#0E1F1B]">
                              {label}
                            </p>

                            <p className="text-sm text-gray-500">
                              {desc}
                            </p>
                          </div>

                          {selected && (
                            <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#418277] animate-[fade-in_.15s_ease]">
                              <Check size={13} className="text-white" />
                            </span>
                          )}
                        </button>
                      )
                    })}

                    {errors.role && (
                      <p className="mt-2 text-sm text-red-500">{errors.role}</p>
                    )}
                  </div>
                  <button onClick={handleContinue}
                    className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#146B5D] font-semibold text-white transition-colors duration-150 hover:bg-[#0B4941]">
                    Continue
                    <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
                  </button>
                </>
              )}
              {/* ====================== STEP 2 ================ */}
              {step === 2 && (
                <>
                  <button type="button"
                    className="mb-5 inline-flex items-center gap-6 bg-transparent border-0 p-0 text-sm text-gray-500 transition-colors duration-150 hover:text-[#0E1F1B]" onClick={() => setStep(1)}>
                    <ArrowLeft size={14} /> Change account type
                  </button>

                  <h1 className="font-['Fraunces'] font-medium text-[28px] mb-[6px] text-[#0E1F1B]">
                    Your details
                  </h1>

                  {selectedRole && (
                    <div className="inline-flex items-center gap-2 bg-[#E5EBE1] rounded-[20px] py-1.5 pr-3 pl-1.5 mb-[22px]">
                      <span className="w-[26px] h-[26px] rounded-[7px] bg-[#146B5D] text-white flex items-center justify-center"><selectedRole.icon size={13} /></span>
                      <span>Signing up as {selectedRole.label}</span>
                    </div>
                  )}

                  {/* ====================== form ============== */}

                  <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name"
                        className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-900">  Full name</label>
                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className="h-12 w-full rounded-xl border border-gray-200 bg-[#E5EBE1] 
                         pl-11 pr-4 text-sm outline-none transition-all duration-150 focus:border-[#146B5D] focus:bg-white focus:ring-2 focus:ring-[#146B5D]/15" />
                      </div>
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    {/* ============== email ============ */}
                    <div className="mb-4">
                      <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500"> Email</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@clinic.com"
                          className="h-12 w-full rounded-xl border border-gray-200 bg-[#E5EBE1] 
                         pl-11 pr-4 text-sm outline-none transition-all duration-150 focus:border-[#146B5D] focus:bg-white focus:ring-2 focus:ring-[#146B5D]/15" />
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    {/* =================== password ============= */}
                    <div className="mb-4">
                      <label htmlFor="confirmPassword"
                        className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-900">Password</label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter password"
                          className="h-12 w-full rounded-xl border border-gray-200 bg-[#E5EBE1] 
                         pl-11 pr-4 text-sm outline-none transition-all duration-150 focus:border-[#146B5D] focus:bg-white focus:ring-2 focus:ring-[#146B5D]/15" />

                        <button type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-green-800 transition-colors duration-150 hover:text-green-950" >
                          {showPassword ? (
                            <EyeOff size={19} />
                          ) : (
                            <Eye size={19} />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.password}
                        </p>
                      )}

                    </div>
                    {/* ================== confirm password ========= */}
                    <div className="mb-4">
                      <label htmlFor="confirmPassword"
                        className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-900">CONFIRM PASSWORD</label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Re-enter password"
                          className="h-12 w-full rounded-xl border border-gray-200 bg-[#E5EBE1] 
                         pl-11 pr-4 text-sm outline-none transition-all duration-150 focus:border-[#146B5D] focus:bg-white focus:ring-2 focus:ring-[#146B5D]/15" />

                        <button type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-green-800 transition-colors duration-150 hover:text-green-950" >
                          {showConfirmPassword ? (
                            <EyeOff size={19} />
                          ) : (
                            <Eye size={19} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                    {/* =========== button ============ */}
                    <div className="mt-6 flex gap-3">
                      <button type="button" onClick={() => setStep(1)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E5EBE1] text-[#0E1F1B] transition-colors duration-150 hover:bg-gray-200 ">
                        ← </button>

                      <button type="submit"
                        disabled={loading}
                        className="group flex h-12 flex-1 justify-center items-center gap-2 bg-[#146B5D] rounded-full text-white font-semibold transition-colors duration-150 hover:bg-[#0B4941] disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading ? "Creating Account..." : (
                          <>
                            Create account
                            <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                </>
              )}
              {/* ================== google ================ */}

               <button
                type="button"
                className="mt-3 flex h-12 w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-500 transition-colors duration-150 hover:bg-[#E5EBE1]/60"
              >
                <span className="text-lg font-bold text-[#4285F4]">
                  G
                </span>
                <span>
                  Log in with Google
                </span>
              </button>


              <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?
                <button type="button"
                  onClick={() => router.push("/LoginPage")}
                  className="ml-1 font-semibold text-[#0E1F1B] transition-colors duration-150 hover:text-[#146B5D]">
                  Log in
                </button>
              </p>
            </div>

          </section>
        </div>
      </main>
    </>
  );
}