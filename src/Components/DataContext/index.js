import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [jobsData, setJobsData] = useState([]);
  const [filteredJobsData, setFilteredJobsData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [company, setCompany] = useState("");
  const [filters, setFilters] = useState({
    selectedRole: "",
    selectedExperience: "",
    workType: "",
    selectedLocation: "",
    selectedBasePay: ""
  });

  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = JSON.stringify({
        limit: limit,
        offset: offset
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
      };
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const responseData = await response.json();
      setJobsData(responseData.jdList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, offset]);

  useEffect(() => {
    handleSearch();
  }, [jobsData]);

  //Handle Filtered Data if filters selected or if No filters seleced
  const handleSearch = () => {
    if (jobsData.length === 0) return; // Wait until jobsData is fetched

    const filteredData = jobsData.filter(job => {
      const roleMatch = !filters.selectedRole || job.jobRole === filters.selectedRole;
      const experienceMatch = !filters.selectedExperience ||
        (job.minExp <= filters.selectedExperience && job.maxExp >= filters.selectedExperience);
      const workTypeMatch = !filters.workType || job.location === filters.workType;
      const locationMatch = !filters.selectedLocation || job.location === filters.selectedLocation;
      const basePayMatch = !filters.selectedBasePay || job.minJdSalary >= filters.selectedBasePay;
      const companyMatch = !company || job.companyName.toLowerCase() === company.toLowerCase();
        
      return (
        roleMatch &&
        experienceMatch &&
        workTypeMatch &&
        locationMatch &&
        basePayMatch &&
        companyMatch
      );
    });

    setFilteredJobsData(filteredData);
    console.log(filteredData);
  };
  console.log(jobsData)

  //handle Infinity Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const pageHeight = document.documentElement.offsetHeight;
      const scrollThreshold = 50;

      if (pageHeight - scrollPosition < scrollThreshold) {
        setLimit(prevLimit => prevLimit + 10);
      }
    };

    const debounceScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debounceScroll);

    return () => {
      window.removeEventListener("scroll", debounceScroll);
    };
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  return (
    <DataContext.Provider
      value={{
        jobsData,
        setJobsData,
        filteredJobsData,
        setFilteredJobsData,
        company,
        setCompany,
        filters,
        setFilters,
        handleSearch
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
