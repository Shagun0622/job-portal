import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJobs from "./pages/ApplyJobs";
import JobApplication from "./pages/JobApplication";
import Application from "./pages/Application";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplication from "./pages/ViewApplication";

export const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div className="min-h-screen">
      {showRecruiterLogin && <RecruiterLogin />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Job Details */}
        <Route path="/apply-job/:id" element={<ApplyJobs />} />

        {/* Apply Job Form */}
        <Route
          path="/apply-job/:id/apply"
          element={<JobApplication />}
        />

        {/* Candidate */}
        <Route
          path="/candidate/applications"
          element={<Application />}
        />

        {/* Recruiter Dashboard */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplication />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
