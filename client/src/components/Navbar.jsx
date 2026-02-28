import { useState, useContext } from "react";
import { assets } from "../assets/assets";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  const role = user?.publicMetadata?.role ?? "user";

  if (!isLoaded) return null;

  return (
    <nav className="shadow bg-white">
      {/* TOP BAR */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <img
          src={assets.logo}
          alt="Logo"
          className="h-8 cursor-pointer"
          onClick={() => {
            navigate("/");
            setOpen(false);
          }}
        />

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          <SignedOut>
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600 hover:text-blue-600"
            >
              Recruiter Login
            </button>

            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {role === "recruiter" && (
              <>
                <button
                  onClick={() => navigate("/recruiter-dashboard")}
                  className="text-blue-600 font-semibold"
                >
                  Recruiter Dashboard
                </button>
                <UserButton afterSignOutUrl="/" />
              </>
            )}

            {role === "user" && (
              <>
                <button
                  onClick={() => navigate("/candidate/applications")}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Applied Jobs
                </button>

                <span className="text-gray-600">
                  Hi, <span className="font-medium">{user?.firstName || "User"}</span>
                </span>

                <UserButton afterSignOutUrl="/" />
              </>
            )}
          </SignedIn>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="sm:hidden border-t bg-white px-4 py-4 space-y-4">
          <SignedOut>
            <button
              onClick={() => {
                setShowRecruiterLogin(true);
                setOpen(false);
              }}
              className="block w-full text-left text-gray-600"
            >
              Recruiter Login
            </button>

            <SignInButton mode="modal">
              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {role === "recruiter" && (
              <>
                <button
                  onClick={() => {
                    navigate("/recruiter-dashboard");
                    setOpen(false);
                  }}
                  className="block w-full text-left text-blue-600"
                >
                  Recruiter Dashboard
                </button>
                <UserButton afterSignOutUrl="/" />
              </>
            )}

            {role === "user" && (
              <>
                <button
                  onClick={() => {
                    navigate("/candidate/applications");
                    setOpen(false);
                  }}
                  className="block w-full text-left text-gray-600"
                >
                  Applied Jobs
                </button>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
          </SignedIn>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


