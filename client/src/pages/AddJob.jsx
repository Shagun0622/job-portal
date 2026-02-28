import React, { useState } from "react";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    level: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50 transition-all";

  const labelClass = "block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-3xl">
      <div className="mb-7">
        <h2 className="text-xl font-bold text-gray-900">Post a New Job</h2>
        <p className="text-sm text-gray-400 mt-1">Fill in the details to publish a new listing</p>
      </div>

      <div className="space-y-5">
        {/* Job Title */}
        <div>
          <label className={labelClass}>Job Title</label>
          <input
            className={inputClass}
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Full Stack Developer"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className={labelClass}>Job Description</label>
          <textarea
            className={`${inputClass} h-32 resize-none`}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the role, responsibilities, and requirements..."
          />
        </div>

        {/* Category / Location / Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select
              className={inputClass}
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {JobCategories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Location</label>
            <select
              className={inputClass}
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              {JobLocations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Level</label>
            <select
              className={inputClass}
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="">Select Level</option>
              <option value="Beginner Level">Beginner</option>
              <option value="Intermediate Level">Intermediate</option>
              <option value="Senior Level">Senior</option>
            </select>
          </div>
        </div>

        {/* Salary */}
        <div className="w-48">
          <label className={labelClass}>Salary (₹ / year)</label>
          <input
            type="number"
            className={inputClass}
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. 50000"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Submit */}
        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm shadow-blue-200">
            Publish Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJob;