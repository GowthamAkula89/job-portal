import React, { useContext } from "react";
import DataContext from "../DataContext";
import "./jobsSection.css";
import JobCard from "../JobCard";

const JobsSection = () => {
    const { filteredJobsData } = useContext(DataContext);
    console.log(filteredJobsData);

    return (
        <div className="jobs-details">
            <div className="jobs-grid">
                {filteredJobsData.map((jobData) => (
                    <div key={jobData.jdUid} className="job-grid-item">
                        <JobCard data={jobData} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobsSection;
