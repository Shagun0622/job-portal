import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import DOMPurify from "dompurify";
import { MapPin, Briefcase, DollarSign, Users, Clock } from "lucide-react";

const ApplyJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs } = useContext(AppContext);
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    if (jobs?.length) {
      const selectedJob = jobs.find((job) => String(job._id) === String(id));
      setJobData(selectedJob);
    }
  }, [id, jobs]);

  if (!jobData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Loading job details...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* TOP SUMMARY CARD */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 sm:px-8 py-7">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex gap-5 items-start">
                {/* Logo */}
                <div className="w-16 h-16 rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center p-2 shrink-0">
                  <img
                    src={jobData.companyId?.image}
                    alt="company logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{jobData.title}</h1>
                  <p className="text-sm text-gray-400 mt-0.5">{jobData.companyId?.name}</p>

                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                    {[
                      { icon: <Briefcase size={13} />, label: jobData.companyId?.name },
                      { icon: <MapPin size={13} />, label: jobData.location },
                      { icon: <Users size={13} />, label: jobData.level },
                      {
                        icon: <DollarSign size={13} />,
                        label: jobData.salary
                          ? kconvert.convertTo(jobData.salary)
                          : "Salary not disclosed",
                      },
                    ].map((item, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                        <span className="text-gray-400">{item.icon}</span>
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 md:items-end shrink-0">
                <button
                  onClick={() => navigate(`/apply-job/${jobData._id}/apply`)}
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-sm shadow-blue-200 transition-all text-sm"
                >
                  Apply Now
                </button>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock size={11} />
                  Posted {moment(jobData.date).fromNow()}
                </span>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex flex-col lg:flex-row gap-7">

            {/* LEFT: Description */}
            <div className="lg:flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Job Description</h2>
                <div className="h-0.5 w-10 bg-blue-600 rounded-full" />
              </div>

              <div
                className="prose prose-sm prose-gray max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(jobData.description || ""),
                }}
              />

              <button
                onClick={() => navigate(`/apply-job/${jobData._id}/apply`)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold shadow-sm shadow-blue-200 transition-all text-sm mt-2"
              >
                Apply Now
              </button>
            </div>

            {/* RIGHT: More Jobs */}
            <div className="lg:w-72 space-y-5 shrink-0">
              <h2 className="text-base font-bold text-gray-800">
                More from {jobData.companyId?.name}
              </h2>

              <div className="space-y-4">
                {jobs
                  .filter(
                    (job) =>
                      job.companyId?._id === jobData.companyId?._id &&
                      job._id !== jobData._id
                  )
                  .slice(0, 3)
                  .map((job) => (
                    <div
                      key={job._id}
                      onClick={() => navigate(`/apply-job/${job._id}`)}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group"
                    >
                      <h3 className="font-semibold text-gray-800 text-sm group-hover:text-blue-700 transition-colors mb-3">
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2.5 py-1 text-xs font-medium bg-slate-50 text-slate-600 border border-slate-100 rounded-lg">
                          {job.location}
                        </span>
                        <span className="px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100 rounded-lg">
                          {job.level}
                        </span>
                      </div>

                      <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                        {job.shortDescription || "Join our team and grow your career."}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyJobs;