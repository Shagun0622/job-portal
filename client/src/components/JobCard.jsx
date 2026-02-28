import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { MapPin, Layers } from "lucide-react";

const JobCard = ({ job }) => {
  if (!job) return null;

  const navigate = useNavigate();

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 flex flex-col gap-5">

      {/* Header: Logo + Title */}
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0 p-2">
          <img
            src={assets.company_icon}
            alt="company"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
            {job.title}
          </h3>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-slate-50 text-slate-600 border border-slate-100">
          <MapPin size={11} />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-amber-50 text-amber-700 border border-amber-100">
          <Layers size={11} />
          {job.level}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-1"
        dangerouslySetInnerHTML={{
          __html: job.description
            ? job.description.slice(0, 120) + "..."
            : "",
        }}
      />

      {/* Divider */}
      <div className="h-px bg-gray-50" />

      {/* Buttons */}
      <div className="flex gap-2.5">
        <button
          onClick={() => navigate(`/apply-job/${job._id}`)}
          className="flex-1 px-4 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm"
        >
          Apply now
        </button>

        <button
          onClick={() => navigate(`/apply-job/${job._id}`)}
          className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;