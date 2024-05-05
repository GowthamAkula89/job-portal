import React, { createContext, useState, useEffect } from "react";
const DataContext = createContext();
export const DataProvider = ({children}) => {
    const [jobsData, setJobsData] = useState([]);
    const [filteredJobsData, setFilteredJobsData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const body = JSON.stringify({
              "limit": 115,
              "offset": 0
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
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);
      // console.log(jobsData.jdList)
      // console.log(filteredJobsData);
    return(
        <DataContext.Provider value={{ jobsData, setJobsData, filteredJobsData, setFilteredJobsData }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;