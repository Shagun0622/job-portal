import React, { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  // ✅ FIXED TYPO HERE
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  // Fetch jobs
  const fetchJobs = () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
