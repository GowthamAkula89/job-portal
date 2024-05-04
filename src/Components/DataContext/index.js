import React, { createContext, useState, useEffect } from "react";
const DataContext = createContext();
export const DataProvider = ({children}) => {
    const [jobsData, setJobsData] = useState([]);
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
      // useEffect(()=>{
      //   if(jobsData.length !== 0){
      //       const allRoles = [];
      //       jobsData.jdList.forEach((job) => {
      //           const jobRole = job.location;
      //           if(jobRole && !allRoles.includes(jobRole)){
      //               allRoles.push(jobRole);
      //           }
      //       })
      //       setRoles(allRoles);
      //   }
      // },[jobsData])
      
      console.log(jobsData.jdList)
    return(
        <DataContext.Provider value={{ jobsData, setJobsData }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;