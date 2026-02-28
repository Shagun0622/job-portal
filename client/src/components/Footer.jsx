import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-400">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-8 pt-14 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Career<span className="text-blue-500">Connect</span>
          </h2>
          <p className="text-sm mt-4 text-slate-400 leading-relaxed">
            Connecting ambitious people with the companies building tomorrow.
          </p>
          {/* Social Links */}
          <div className="flex gap-3 mt-6">
            {["LinkedIn", "GitHub", "Twitter"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all font-medium"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
            Product
          </h3>
          <ul className="space-y-3">
            {["Jobs", "Categories", "Applied Jobs", "Saved Jobs"].map(
              (item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
            Resources
          </h3>
          <ul className="space-y-3">
            {["Resume Tips", "Interview Prep", "Career Advice"].map(
              (item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <span className="text-slate-600">✉</span>
              support@careerconnect.com
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-600">📍</span>
              India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} CareerConnect. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;