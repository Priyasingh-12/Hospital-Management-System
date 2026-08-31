"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

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

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // Stop API call if validation fails
    if (newErrors.email || newErrors.password) {
      return;
    }

    // Start loading
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
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
          email: data.message,
          password: "",
        });

        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Login successful
      toast.success("Login successful!");

      setTimeout(() => {
        // Go to dashboard
        if (data.user.role === "admin") {
          router.push("/admin/dashboard");
        } else if (data.user.role === "doctor") {
          router.push("/doctor/dashboard");
        } else if (data.user.role === "patient") {
          router.push("/patient/dashboard");
        }
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);

      setErrors({
        email: "Unable to connect to server",
        password: "",
      });
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

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
                Log in to pick up right where you left off — visits,
                schedules, and records, all in one place.
              </p>

            </div>
          </section>

          {/* ====================== right side ============ */}
          <section className="flex flex-1 items-center justify-center px-8 py-10">
            <div className="w-full max-w-md">
              <span className=" mb-6 block text-[10.5px] tracking-[0.08em] uppercase text-[#6C7B75]"  >
                Welcome back
              </span>

              <h1 className="text-3xl font-medium text-[#0E1F1B]">
                Log in to your account
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Enter your details to pick up where you left off.
              </p>

              {/* ====================== form ============== */}

              <form className="mt-6" onSubmit={handleSubmit}>
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
                <div className="mb-2">
                  <label htmlFor="password"
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

                {/* ================= FORGOT PASSWORD ================= */}
                <div className="mb-4 flex justify-end">
                  <button
                    type="button"
                    className="text-xs font-medium text-[#146B5D] transition-colors duration-150 hover:text-[#0B4941]"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* =========== button ============ */}
                <button type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#146B5D] font-semibold text-white transition-colors duration-150 hover:bg-[#0B4941] disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? "Logging in..." : (
                    <>
                      Log in
                      <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* ================= GOOGLE LOGIN ================= */}
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
                Don&apos;t have an account?
                <button type="button"
                  onClick={() => router.push("/SignupPage")}
                  className="ml-1 font-semibold text-[#0E1F1B] transition-colors duration-150 hover:text-[#146B5D]">
                  Sign up
                </button>
              </p>
            </div>

          </section>
        </div>
      </main>
    </>
  );
}