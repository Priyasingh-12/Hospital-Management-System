"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Stethoscope,
  ShieldCheck,
  Briefcase,
  Check,
} from "lucide-react";

const ROLES = [
  {
    value: "patient",
    label: "Patient",
    desc: "Book visits & view records",
    icon: User,
  },
  {
    value: "doctor",
    label: "Doctor",
    desc: "Manage patients & schedule",
    icon: Stethoscope,
  },
  {
    value: "staff",
    label: "Staff",
    desc: "Front desk & operations",
    icon: Briefcase,
  },
  {
    value: "admin",
    label: "Admin",
    desc: "Full system access",
    icon: ShieldCheck,
  },
];

export default function SignupPage() {
  const router = useRouter();

  // Show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
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

  // ================= HANDLE CHANGE =================

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

  // ===================  handle role select ===========
  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });

    setErrors({ ...errors, role: "", })

  }
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

  return (
    <main className="min-h-screen bg-[#f5f9fc] p-3 sm:p-5">

      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-[1400px] overflow-hidden rounded-[20px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

        {/* ================= LEFT SIDE ================= */}

        <section className="relative hidden w-1/2 overflow-hidden lg:block">

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/doctorphoto.avif')",
            }}
          />

          {/* Blue overlay */}

          <div className="absolute inset-0 bg-gradient-to-b from-[#d7edfb]/50 via-[#72add2]/55 to-[#267eae]/95" />

          {/* Left content */}

          <div className="relative z-10 flex h-full flex-col justify-end px-16 pb-16 text-green-950">

            <h1 className="mb-8 text-3xl font-bold tracking-wide">
              MEDICARE +
            </h1>

            <p className="max-w-md text-lg font-bold leading-7 text-green-950/95">
              Empowering Healthcare, One Click at a Time:
              <br />
              Your Health, Your Records, Your Control.
            </p>

          </div>

        </section>

        {/* ================= RIGHT SIDE ================= */}

        <section className="flex w-full items-center justify-center bg-white px-6 py-10 lg:w-1/2">

          <div className="w-full max-w-[450px]">

            {/* ================= HEADING ================= */}

            <div>

              <h1 className="text-4xl font-bold text-gray-950">
                Sign Up
              </h1>

              <p className="mt-2 text-blue-600">
                Create your account.
              </p>

            </div>

            {/* ================= FORM ================= */}

            <form
              className="mt-8"
              onSubmit={handleSubmit}
            >
              {/* ================== Role Select ============ */}
              <div className="mb-6" >
                <label className="mb-2 block text-sm font-semibold text-green-950">
                  I am signing up as
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {ROLES.map(({ value, label, desc, icon: Icon }) => {

                    const selected = formData.role === value;
                    return (
                      <button key={value} type="button" onClick={() => handleRoleSelect(value)}
                        className={`flex flex-col relative gap-1 items-start rounded-xl border p-3.5 text-left transition ${selected ? "border-[#4b91bb] bg-[#eaf4fb] ring-2 ring-[#4b91bb]/20" :
                            "border-gray-800 bg-white hover:border-[#4b91bb]/50 hover:bg-[#a4d1f3]"
                          }`} >
                        {selected && (
                          <span className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#4b91bb]">
                            <Check size={15} className="text-black" />
                          </span>
                        )}
                        <Icon
                          size={20}
                          className={
                            selected ? "text-[#4b91bb]" : "text-green-900"} />
                        <span className="text-sm font-semibold text-gray-900">
                          {label}
                        </span>
                        <span className="text-xs text-gray-500">{desc}</span>
                      </button>
                    )
                  })}
                </div>
                {errors.role && (
                  <p className="mt-2 text-sm text-red-500">{errors.role}</p>
                )}
              </div>

              {/* ================= NAME ================= */}

              <div className="mb-5">

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-green-950"
                >
                  Name
                </label>

                <div className="relative">

                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-950"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`h-[54px] w-full rounded-lg border bg-white pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 ${errors.name
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                      : "border-gray-200 focus:border-[#4b91bb] focus:ring-[#4b91bb]/10"
                      }`}
                  />

                </div>

                {errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.name}
                  </p>
                )}

              </div>

              {/* ================= EMAIL ================= */}

              <div className="mb-5">

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-green-950"
                >
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-950"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`h-[54px] w-full rounded-lg border bg-white pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 ${errors.email
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                      : "border-gray-200 focus:border-[#4b91bb] focus:ring-[#4b91bb]/10"
                      }`}
                  />

                </div>

                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}

              </div>

              {/* ================= PASSWORD ================= */}

              <div className="mb-5">

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-950"
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`h-[54px] w-full rounded-lg border bg-white pl-12 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 ${errors.password
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                      : "border-gray-200 focus:border-[#4b91bb] focus:ring-[#4b91bb]/10"
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-800 hover:text-green-950"
                  >
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

              {/* ================= CONFIRM PASSWORD ================= */}

              <div className="mb-6">

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-950"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`h-[54px] w-full rounded-lg border bg-white pl-12 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:ring-2 ${errors.confirmPassword
                      ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                      : "border-gray-200 focus:border-[#4b91bb] focus:ring-[#4b91bb]/10"
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-800 hover:text-green-950"
                  >
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

              {/* ================= SIGNUP BUTTON ================= */}

              <button
                type="submit"
                disabled={loading}
                className="h-[52px] w-full rounded-full bg-[#4b91bb] text-sm font-semibold text-green-950 shadow-sm transition duration-200 hover:bg-[#3d82aa] hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>

            {/* ================= LOGIN ================= */}

            <p className="mt-8 text-center text-sm text-gray-400">

              Already have an account?{" "}

              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-medium text-green-950 hover:text-blue-500 hover:underline"
              >
                Login
              </button>

            </p>

          </div>

        </section>

      </div>

    </main>
  );
}