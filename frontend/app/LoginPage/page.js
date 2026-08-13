"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

const [showPassword, setShowPassword] = useState(false);
 const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);
  };

  return (
    <main className="min-h-screen bg-[#f5f9fc] p-3 sm:p-5">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-[1400px] overflow-hidden rounded-[20px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        {/* LEFT SIDE */}
        <section className="relative hidden w-1/2 overflow-hidden lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/doctorphoto.avif')" }}
          />
          {/* blue overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#d7edfb]/50 via-[#72add2]/55 to-[#267eae]/95" />
          {/* "absolute  bg-gradient-to-b from-[#d7edfb]/50 via-[#72add2]/55 to-[#267eae]/95" */}
          {/* content == */}
          <div className="flex h-full justify-end text-green-950 px-16 flex-col pb-16 relative z-10">
            <h1 className="mb-8 text-3xl font-bold tracking-wide">
              MEDICARE +
            </h1>
            <p className="max-w-md font-bold text-lg leading-7 text-green-950/95">
              Empowering Healthcare, One Click at a Time:
              <br />
              Your Health, Your Records, Your Control.
            </p>
          </div>
        </section>

        {/*================================= RIGHT SIDE  ============================*/}
        <section className="flex w-full items-center justify-center bg-white px-6 py-10 lg:w-1/2">
          <div className="w-full max-w-[450px]">

            {/* Login Heading */}
            <div>
              <h1 className="text-4xl font-bold text-gray-950">
                Login
              </h1>
              <p className="mt-2 text-green-950 ">Log in to your account.</p>
            </div>
            {/* logon form */}
            <form className="mt-8" onSubmit={handleSubmit}>

              <div className="mb-5">
                <label htmlFor="email" className="mb-2  text-green-950 text-sm font-semibold block">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2  text-green-950"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="h-[54px] w-full rounded-lg border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#4b91bb] focus:ring-2 focus:ring-[#4b91bb]/10"
                  />
                </div>

              </div>
              {/* password */}
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-800">
                  Password
                </label>
                <div className="relative ">
                  <Lock size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-950" />
                  <input
                    id="password"
                    name="password"
                     value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-[54px] w-full rounded-lg border border-gray-200 bg-white pl-12 pr-12 text-sm text-green-950 outline-none transition placeholder:text-gray-400 focus:border-[#4b91bb] focus:ring-2 focus:ring-[#4b91bb]/10"
                  />
                  {/* show and hide btn */}
                  <button type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 hover:text-green-950 text-green-800  top-1/2 -translate-y-1/2  ">
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (<Eye size={19} />)}
                  </button>
                </div>
              </div>
              {/* =================== forgot passward */}
              <div className="mb-7 flex justify-end">
                <button type="button" className="text-sm font-medium text-green-950 transition hover:text-[#286783]">
                  Forgot Password?</button>
              </div>
              <button
                type="submit"
                className="h-[52px] w-full rounded-full bg-[#4b91bb] text-sm font-semibold text-green-950 shadow-sm transition duration-200 hover:bg-[#3d82aa] hover:shadow-md active:scale-[0.99]"
              >
                Log In
              </button>
            </form>

            {/* Google Login */}
            <button
              type="button"
              className="mt-3 flex h-[52px] w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-500 transition hover:bg-gray-50"
            >
              <span className="text-lg font-bold text-[#4285F4]">
                G
              </span>

              <span>Log in with Google</span>
            </button>
            {/* Signup */}
            <p className="mt-8 text-center text-sm text-gray-400">
              Do not have an account?{" "}

              <button
                onClick={() => router.push("/SignupPage")}
                type="button"
                className="font-medium text-green-950 hover:underline hover:text-blue-500"
              >
                Sign Up
              </button>
            </p>

          </div>
        </section>
      </div>
    </main >
  );
}
