import React, { useState } from "react";
import { manageJobsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const ManageJobs = () => {
  const navigate = useNavigate();

  const [visibleJobs, setVisibleJobs] = useState(
    manageJobsData.reduce((acc, job) => {
      acc[job._id] = true;
      return acc;
    }, {})
  );

  const toggleVisibility = (id) => {
    setVisibleJobs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Manage Jobs</h2>
          <p className="text-xs text-gray-400 mt-0.5">{manageJobsData.length} listings</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-blue-200"
        >
          <Plus size={15} />
          Add Job
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-left">
              {["#", "Job Title", "Date", "Location", "Applicants", "Visible"].map((h) => (
                <th key={h} className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {manageJobsData.map((job, index) => (
              <tr key={job._id} className="hover:bg-gray-50/60 transition-colors">
                <td className="py-4 px-5 text-gray-400 text-xs">{index + 1}</td>
                <td className="py-4 px-5 font-semibold text-gray-800">{job.title}</td>
                <td className="py-4 px-5 text-gray-500">{formatDate(job.date)}</td>
                <td className="py-4 px-5 text-gray-500">{job.location}</td>
                <td className="py-4 px-5">
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg">
                    {job.applicants}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <button
                    onClick={() => toggleVisibility(job._id)}
                    className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 focus:outline-none ${
                      visibleJobs[job._id] ? "bg-blue-600" : "bg-gray-200"
                    }`}
                    style={{ width: "40px", height: "22px" }}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform duration-200 ${
                        visibleJobs[job._id] ? "translate-x-[18px]" : "translate-x-0"
                      }`}
                      style={{ width: "18px", height: "18px" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden divide-y divide-gray-50">
        {manageJobsData.map((job, index) => (
          <div key={job._id} className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-800">{job.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{job.location}</p>
              </div>
              <span className="text-xs text-gray-400">#{index + 1}</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{formatDate(job.date)}</span>
              <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg">
                {job.applicants} applicants
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Listing visible</span>
              <button
                onClick={() => toggleVisibility(job._id)}
                className={`relative rounded-full transition-colors duration-200 ${
                  visibleJobs[job._id] ? "bg-blue-600" : "bg-gray-200"
                }`}
                style={{ width: "40px", height: "22px" }}
              >
                <span
                  className={`absolute top-0.5 left-0.5 bg-white rounded-full shadow transition-transform duration-200 ${
                    visibleJobs[job._id] ? "translate-x-[18px]" : "translate-x-0"
                  }`}
                  style={{ width: "18px", height: "18px" }}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;