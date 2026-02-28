import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { jobsApplied as initialJobs } from "../assets/assets";
import { Upload, Pencil, X } from "lucide-react";

const statusConfig = {
  Pending:  { bg: "bg-amber-50",  text: "text-amber-600",  dot: "bg-amber-400"  },
  Accepted: { bg: "bg-green-50",  text: "text-green-600",  dot: "bg-green-400"  },
  Rejected: { bg: "bg-red-50",    text: "text-red-500",    dot: "bg-red-400"    },
};

const Application = () => {
  const [isResumeEdit, setIsResumeEdit] = useState(false);
  const [jobs, setJobs] = useState(initialJobs);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...jobs];
    updated[index].status = newStatus;
    setJobs(updated);
    setEditingIndex(null);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Resume Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Your Resume</h2>
              <p className="text-xs text-gray-400 mt-0.5">Manage your uploaded resume</p>
            </div>
            <button
              onClick={() => setIsResumeEdit(!isResumeEdit)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                isResumeEdit
                  ? "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {isResumeEdit ? <><X size={14} /> Cancel</> : <><Pencil size={14} /> Edit</>}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-100">
              📄 resume.pdf
            </div>

            {isResumeEdit && (
              <label className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                <Upload size={15} />
                Upload new resume
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </label>
            )}
          </div>
        </div>

        {/* Jobs Applied Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Jobs Applied</h2>
            <p className="text-xs text-gray-400 mt-0.5">{jobs.length} applications</p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                  {["Company", "Job Title", "Location", "Date", "Status", ""].map((h) => (
                    <th key={h} className="py-3.5 px-5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {jobs.map((job, index) => {
                  const s = statusConfig[job.status] || statusConfig.Pending;
                  return (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                            <img src={job.logo} alt={job.company} className="w-6 h-6 object-contain" />
                          </div>
                          <span className="font-semibold text-gray-800">{job.company}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-gray-600">{job.title}</td>
                      <td className="py-4 px-5 text-gray-500">{job.location}</td>
                      <td className="py-4 px-5 text-gray-400 text-xs">{job.date}</td>
                      <td className="py-4 px-5">
                        {editingIndex === index ? (
                          <select
                            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-400 bg-white"
                            value={job.status}
                            onChange={(e) => handleStatusChange(index, e.target.value)}
                          >
                            <option>Pending</option>
                            <option>Accepted</option>
                            <option>Rejected</option>
                          </select>
                        ) : (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg ${s.bg} ${s.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                            {job.status}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-5">
                        <button
                          onClick={() => setEditingIndex(index)}
                          className="text-xs text-blue-500 hover:text-blue-700 font-semibold hover:underline underline-offset-2 transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden divide-y divide-gray-50">
            {jobs.map((job, index) => {
              const s = statusConfig[job.status] || statusConfig.Pending;
              return (
                <div key={index} className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img src={job.logo} alt={job.company} className="w-7 h-7 object-contain" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{job.company}</p>
                      <p className="text-xs text-gray-400">{job.title}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                    <div><span className="text-xs font-medium text-gray-400">Location</span><p>{job.location}</p></div>
                    <div><span className="text-xs font-medium text-gray-400">Date</span><p>{job.date}</p></div>
                  </div>

                  <div className="flex items-center justify-between">
                    {editingIndex === index ? (
                      <select
                        className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-400 bg-white"
                        value={job.status}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                      >
                        <option>Pending</option>
                        <option>Accepted</option>
                        <option>Rejected</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg ${s.bg} ${s.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {job.status}
                      </span>
                    )}
                    <button
                      onClick={() => setEditingIndex(index)}
                      className="text-xs text-blue-500 hover:text-blue-700 font-semibold hover:underline underline-offset-2"
                    >
                      Edit status
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;