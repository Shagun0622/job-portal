import React, { useState } from "react";
import { viewApplicationsPageData, assets } from "../assets/assets";
import { MoreHorizontal, Download } from "lucide-react";

const ViewApplication = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const [applications, setApplications] = useState(
    viewApplicationsPageData.map((item) => ({ ...item, status: "Pending" }))
  );

  const handleAction = (id, action) => {
    setApplications((prev) =>
      prev.map((app) => (app._id === id ? { ...app, status: action } : app))
    );
    setOpenMenu(null);
  };

  const statusConfig = {
    Pending:  { bg: "bg-amber-50",  text: "text-amber-600",  dot: "bg-amber-400"  },
    Accepted: { bg: "bg-green-50",  text: "text-green-600",  dot: "bg-green-400"  },
    Rejected: { bg: "bg-red-50",    text: "text-red-500",    dot: "bg-red-400"    },
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">View Applications</h2>
        <p className="text-xs text-gray-400 mt-0.5">{applications.length} total applicants</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-left">
              {["#", "Applicant", "Job Title", "Location", "Resume", "Status", ""].map((h) => (
                <th key={h} className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {applications.map((item, index) => {
              const s = statusConfig[item.status];
              return (
                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5 text-gray-400 text-xs">{index + 1}</td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imgSrc}
                        alt={item.name}
                        className="w-8 h-8 rounded-full object-cover border border-gray-100"
                      />
                      <span className="font-semibold text-gray-800">{item.name}</span>
                    </div>
                  </td>

                  <td className="py-4 px-5 text-gray-600">{item.jobTitle}</td>
                  <td className="py-4 px-5 text-gray-500">{item.location}</td>

                  <td className="py-4 px-5">
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-lg transition-colors">
                      <Download size={12} />
                      Resume
                    </button>
                  </td>

                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg ${s.bg} ${s.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === item._id ? null : item._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {openMenu === item._id && (
                      <div className="absolute right-5 mt-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden">
                        <button
                          onClick={() => handleAction(item._id, "Accepted")}
                          className="w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 transition-colors font-medium"
                        >
                          ✓ Accept
                        </button>
                        <div className="h-px bg-gray-100" />
                        <button
                          onClick={() => handleAction(item._id, "Rejected")}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-50">
        {applications.map((item) => {
          const s = statusConfig[item.status];
          return (
            <div key={item._id} className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.imgSrc}
                    alt={item.name}
                    className="w-10 h-10 rounded-full border border-gray-100 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.jobTitle}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg ${s.bg} ${s.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  {item.status}
                </span>
              </div>

              <p className="text-sm text-gray-500">{item.location}</p>

              <div className="flex items-center justify-between">
                <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors">
                  <Download size={12} />
                  Resume
                </button>

                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === item._id ? null : item._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                  >
                    <MoreHorizontal size={16} />
                  </button>

                  {openMenu === item._id && (
                    <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden">
                      <button
                        onClick={() => handleAction(item._id, "Accepted")}
                        className="w-full text-left px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 font-medium"
                      >
                        ✓ Accept
                      </button>
                      <div className="h-px bg-gray-100" />
                      <button
                        onClick={() => handleAction(item._id, "Rejected")}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewApplication;