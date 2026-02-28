import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Mail, Lock, Building2, Image as ImageIcon } from "lucide-react";

const RecruiterLogin = () => {
  const { setShowRecruiterLogin } = useContext(AppContext);

  const [state, setState] = useState("Login"); // Login | Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state === "Login") {
      console.log("Recruiter Login:", { email, password });
    } else {
      console.log("Recruiter Signup:", { company, email, password, logo });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
      <div className="relative w-[420px] bg-white rounded-2xl shadow-2xl p-8">

        {/* Close */}
        <button
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          {state === "Login" ? "Recruiter Login" : "Recruiter Sign Up"}
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-6">
          {state === "Login"
            ? "Welcome back! Please sign in to continue"
            : "Create an account to start hiring"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Company Name (Sign Up only) */}
          {state === "Sign Up" && (
            <div className="flex items-center border rounded-full px-4 py-3 bg-gray-50">
              <Building2 className="text-gray-400 mr-3" size={18} />
              <input
                type="text"
                placeholder="Company Name"
                className="bg-transparent outline-none w-full text-sm"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="flex items-center border rounded-full px-4 py-3 bg-gray-50">
            <Mail className="text-gray-400 mr-3" size={18} />
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent outline-none w-full text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-full px-4 py-3 bg-gray-50">
            <Lock className="text-gray-400 mr-3" size={18} />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none w-full text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Logo Upload (Sign Up only) */}
          {state === "Sign Up" && (
            <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-xl py-4 cursor-pointer text-gray-500 hover:bg-gray-50">
              <ImageIcon size={18} />
              Upload Company Logo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setLogo(e.target.files[0])}
              />
            </label>
          )}

          {/* Forgot password (Login only) */}
          {state === "Login" && (
            <div className="text-right text-sm">
              <button type="button" className="text-blue-600 hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition"
          >
            {state === "Login" ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Switch Mode */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {state === "Login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setState("Sign Up")}
                className="text-blue-600 font-medium hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setState("Login")}
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default RecruiterLogin;
