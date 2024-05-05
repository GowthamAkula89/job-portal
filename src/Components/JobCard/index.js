import React, {useState} from "react";
import "./jobCard.css";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import BoltIcon from '@mui/icons-material/Bolt';
const JobCard = ({data}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const maxDescriptionLength = 250;
    const truncatedDescription = data.jobDetailsFromCompany.substring(0, maxDescriptionLength);
    const shouldTruncate = data.jobDetailsFromCompany.length > maxDescriptionLength;
    return(
        <div className="job-card">
            <div className="job-posted-time">
                <HourglassBottomIcon/>
                <div>Posted 10 days ago</div>
            </div>
            <div className="job-title-details">
                <img src={data.logoUrl} style={{width:"56px", height:"68px"}} alt="company_logo"/>
                <div className="company-details">
                    <div className="company-name">{data.companyName}</div>
                    <div className="company-role">{data.jobRole.charAt(0).toUpperCase() + data.jobRole.slice(1)} Engineer</div>
                    <div className="work-location">{data.location.charAt(0).toUpperCase() + data.location.slice(1)}</div>
                </div>
            </div>
            <div className="job-salary">Estimated Salary:  
                    {data.minJdSalary !== null ? " "+data.minJdSalary+" USD - " : ""} 
                    {data.maxJdSalary !== null ? (data.minJdSalary === null? " upto ":"")+data.maxJdSalary+" USD":""}
            </div>
            <div>
                <div className="about-company">About Company:</div>
                <div className="about-us">About us</div>
                <div >
                    {isExpanded ? (
                        <div className="company-discription">{data.jobDetailsFromCompany}</div>
                    ) : (
                        <div className="company-discription">
                            {truncatedDescription}
                            {shouldTruncate && !isExpanded && <span>...</span>}
                        </div>
                    )}
                    {shouldTruncate && (
                        <button className="view-more-btn" onClick={toggleExpand}>
                            {isExpanded ? "View Less" : "View More"}
                        </button>
                    )}
                </div>
            </div>
            <div>
                <div className="min-exp-title">Minimum Experience</div>
                <div>{data.minExp !== null ? data.minExp : 0} years</div>
            </div>
            <a href={data.jdLink}  className="apply-btn">
                <BoltIcon style={{fill: "#fbd81b"}}/>
                <div className="apply-btn-text">Easy Apply</div>
            </a>
        </div>
    )
}
export default JobCard;