import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [jobsData, setJobsData] = useState([]);
    const [filteredJobsData, setFilteredJobsData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const body = JSON.stringify({
          "limit": limit,
          "offset": offset
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body
        };
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const responseData = await response.json();
        setJobsData(responseData);
        setFilteredJobsData(responseData.jdList) 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [limit, offset]);

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
        const pageHeight = document.documentElement.offsetHeight;
        const scrollThreshold = 50;

        if (pageHeight - scrollPosition < scrollThreshold) {
          setLimit(prevLimit => prevLimit + 10);
        }
      };
      const debounceScroll = debounce(handleScroll, 200);
      window.addEventListener('scroll', debounceScroll);
      return () => {
        window.removeEventListener('scroll', debounceScroll);
      };
    }, []);

    const debounce = (func, delay) => {
      let timeout;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
      };
    };

    return (
        <DataContext.Provider value={{ jobsData, setJobsData, filteredJobsData, setFilteredJobsData, limit, setLimit, offset, setOffset }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
