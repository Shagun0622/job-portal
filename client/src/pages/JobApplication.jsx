import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, X, CheckCircle, Briefcase } from "lucide-react";
import Navbar from "../components/Navbar";

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, resume: "Please upload a PDF or Word document" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, resume: "File size must be less than 5MB" });
        return;
      }
      setFormData({ ...formData, resume: file });
      setErrors({ ...errors, resume: "" });
    }
  };

  const removeFile = () => setFormData({ ...formData, resume: null });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!formData.resume) newErrors.resume = "Resume is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Applied for job:", jobId);
      console.log(formData);
      setIsSubmitting(false);
      alert("Application submitted successfully!");
      navigate("/applications");
    }, 1500);
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-xl text-sm text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-300 bg-red-50 focus:ring-red-100 focus:border-red-400"
        : "border-gray-200 focus:ring-blue-50 focus:border-blue-400"
    }`;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Apply for Position</h2>
            <p className="text-sm text-gray-400 mt-1.5">
              Complete the form below to submit your application
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="John Doe"
                  className={inputClass("name")}
                  onChange={handleChange}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="john.doe@example.com"
                  className={inputClass("email")}
                  onChange={handleChange}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  placeholder="+91 98765 43210"
                  className={inputClass("phone")}
                  onChange={handleChange}
                />
                {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                  Resume / CV <span className="text-red-400">*</span>
                </label>

                {!formData.resume ? (
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                      errors.resume
                        ? "border-red-300 bg-red-50"
                        : "border-gray-200 hover:border-blue-400 hover:bg-blue-50/50"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PDF or Word · Max 5MB</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{formData.resume.name}</p>
                        <p className="text-xs text-gray-400">
                          {(formData.resume.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {errors.resume && <p className="mt-1.5 text-xs text-red-500">{errors.resume}</p>}
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all ${
                    isSubmitting
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm shadow-blue-200 hover:shadow-blue-300"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>

                <p className="text-xs text-center text-gray-400 mt-4">
                  By submitting, you agree to our{" "}
                  <span className="underline underline-offset-2 cursor-pointer hover:text-gray-600">terms</span> and{" "}
                  <span className="underline underline-offset-2 cursor-pointer hover:text-gray-600">privacy policy</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplication;