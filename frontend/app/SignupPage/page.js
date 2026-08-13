"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Signup Data:", formData);
  };


  return (
    <main className="min-h-screen bg-[#f5f9fc] p-3 sm:p-5">

      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-[1400px] overflow-hidden rounded-[20px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

        {/* ================= LEFT SIDE ================= */}
        <section className="relative hidden w-1/2 overflow-hidden lg:block">

          {/* Doctor Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/doctorphoto.avif')",
            }}
          />

          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#d7edfb]/50 via-[#72add2]/55 to-[#267eae]/95" />

          {/* Left Content */}
          <div className="relative z-10 flex h-full flex-col justify-end px-16 pb-16 text-white">

            {/* Logo */}
            <div className="mb-8">

              <div className="mb-2 flex h-9 w-16 overflow-hidden rounded-full border-[3px] border-white bg-white">

                <div className="w-1/2 bg-[#4b9aca]" />

                <div className="flex w-1/2 items-center justify-center bg-white">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-400 via-red-400 to-blue-500" />
                </div>

              </div>

              <h2 className="text-3xl font-bold tracking-wide text-green-950">
                MEDICARE +
              </h2>

            </div>

            {/* Tagline */}
            <p className="max-w-md text-lg leading-7 text-green-950/95">
              Empowering Healthcare, One Click at a Time:
              <br />
              Your Health, Your Records, Your Control.
            </p>

          </div>
        </section>


        {/* ================= RIGHT SIDE ================= */}
        <section className="flex w-full items-center justify-center bg-white px-6 py-10 sm:px-10 lg:w-1/2 lg:px-16">

          <div className="w-full max-w-[450px]">

            {/* Heading */}
            <div className="mb-8">

              <div className="mb-7 flex h-8 w-14 overflow-hidden rounded-full border-2 border-[#111827] bg-[#4b9aca]">

                <div className="w-1/2 bg-[#55a8d4]" />

                <div className="flex w-1/2 items-center justify-center bg-white">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-orange-400 via-red-400 to-blue-500" />
                </div>

              </div>

              <h1 className="text-4xl font-bold tracking-tight text-green-950">
                Sign Up
              </h1>

              <p className="mt-2 text-base text-green-950">
                Create your account.
              </p>

            </div>


            {/* ================= FORM ================= */}
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-5">

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-green-950"
                >
                  Full Name
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
                    placeholder="Enter your full name"
                    className="h-[54px] w-full rounded-lg border border-gray-200 bg-white pl-12 pr-4 text-sm text-green-950 outline-none transition placeholder:text-gray-400 focus:border-[#4b91bb] focus:ring-2 focus:ring-[#4b91bb]/10"
                  />

                </div>

              </div>


              {/* Email */}
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
                    className="h-[54px] w-full rounded-lg border border-gray-200 bg-white pl-12 pr-4 text-sm text-green-950 outline-none transition placeholder:text-gray-400 focus:border-[#4b91bb] focus:ring-2 focus:ring-[#4b91bb]/10"
                  />

                </div>

              </div>


              {/* Password */}
              <div className="mb-5">

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-green-950"
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
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-[54px] w-full rounded-lg border border-gray-200 bg-white pl-12 pr-12 text-sm text-green-950 outline-none transition placeholder:text-gray-400 focus:border-[#4b91bb] focus:ring-2 focus:ring-[#4b91bb]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-900 hover:text-green-950"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>


              {/* Confirm Password */}
              <div className="mb-7">

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-green-950"
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
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    className="h-[54px] w-full rounded-lg border border-gray-200 bg-white pl-12 pr-12 text-sm text-green-950 outline-none transition placeholder:text-gray-400 focus:border-[#4b91bb] focus:ring-2 focus:ring-[#4b91bb]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-900 hover:text-green-950"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>


              {/* Sign Up Button */}
              <button
                type="submit"
                className="h-[52px] w-full rounded-full bg-[#4b91bb] text-sm font-semibold text-green-950 shadow-sm transition duration-200 hover:bg-[#3d82aa] hover:shadow-md active:scale-[0.99]"
              >
                Create Account
              </button>

            </form>


            {/* Google Signup */}
            <button
              type="button"
              className="mt-3 flex h-[52px] w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-500 transition hover:bg-gray-50"
            >
              <span className="text-lg font-bold text-[#4285F4]">
                G
              </span>

              <span>Sign up with Google</span>
            </button>


            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-gray-400">

              Already have an account?{" "}

              <button
                type="button"
                onClick={() => router.push("/LoginPage")}
                className="font-medium text-green-950 hover:underline hover:text-blue-500"
              >
                Log In
              </button>

            </p>

          </div>

        </section>

      </div>

    </main>
  );
}