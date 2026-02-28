import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import JobCard from "./JobCard";
import { assets } from "../assets/assets";
import { SlidersHorizontal, X } from "lucide-react";

const categories = [
  "Programming",
  "Data Science",
  "Designing",
  "Networking",
  "Management",
  "Marketing",
  "Cybersecurity",
];

const locations = [
  "Bangalore",
  "Washington",
  "Hyderabad",
  "Mumbai",
  "California",
];

const JOBS_PER_PAGE = 6;

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden flex justify-start px-6 py-4 mt-2">
        <button
          onClick={() => setShowFilter(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl shadow-sm border border-gray-100 text-sm font-medium hover:border-blue-200 hover:text-blue-600 transition-all"
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 py-10 px-6">

        {/* LEFT SIDEBAR */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 bg-white w-72 p-7 shadow-2xl
            transform transition-transform duration-300 ease-in-out
            ${showFilter ? "translate-x-0" : "-translate-x-full"}
            lg:static lg:w-60 lg:translate-x-0 lg:bg-transparent lg:shadow-none lg:p-0
          `}
        >
          {/* Close button (mobile) */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <span className="font-semibold text-gray-800">Filters</span>
            <button
              onClick={() => setShowFilter(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Category
            </h3>

            <div className="space-y-1">
              {categories.map((category, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-blue-50 group transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-blue-700 transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Location
            </h3>

            <div className="space-y-1">
              {locations.map((location, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-blue-50 group transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-blue-700 transition-colors">
                    {location}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Overlay (mobile) */}
        {showFilter && (
          <div
            onClick={() => setShowFilter(false)}
            className="lg:hidden fixed inset-0 bg-black/30 z-30 backdrop-blur-sm"
          />
        )}

        {/* RIGHT CONTENT */}
        <main className="flex-1 min-w-0">
          {/* Current Search */}
          {isSearched &&
            (searchFilter.title !== "" || searchFilter.location !== "") && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-blue-800">
                    Active Search Filter
                  </h3>
                  <button
                    onClick={() => setSearchFilter({ title: "", location: "" })}
                    className="text-xs text-blue-500 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

          {/* Job Cards */}
          <section>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Latest Jobs</h3>
              <p className="mt-1 text-sm text-gray-400">
                Get your desired job from top companies
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {currentJobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {/* Prev */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <img src={assets.left_arrow_icon} alt="prev" className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium border transition-all ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                {/* Next */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <img src={assets.right_arrow_icon} alt="next" className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default JobListing;