import React, { useContext, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import "./filterSection.css";
import DataContext from "../DataContext";

const roles = ['frontend', 'ios', 'android', 'tech lead', 'backend'];
const experiences = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const locations = ['delhi ncr', 'mumbai', 'chennai', 'bangalore'];
const basePays = [10, 20, 30, 40, 50, 60, 70, 80];

export default function FilterSection() {
    const { jobsData, setFilteredJobsData } = useContext(DataContext);
    const [company, setCompany] = useState("");
    const [debounceTimer, setDebounceTimer] = useState(null);
    const [filters, setFilters] = useState({
        selectedRole: "",
        selectedExperience: "",
        workType: "",
        selectedLocation: "",
        selectedBasePay: ""
    });

    const handleFilterChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
    };

    const debounceSearch = (event, timeout) => {
        if (timeout) {
            clearTimeout(debounceTimer);
        }
        const timer = setTimeout(() => {
            setCompany(event.target.value);
        }, 500);
        setDebounceTimer(timer);
    };

    const handleSearch = () => {
        const filteredData = jobsData.jdList.filter(job => {
            const roleMatch = !filters.selectedRole || job.jobRole === filters.selectedRole;
            const experienceMatch = !filters.selectedExperience || (job.minExp <= filters.selectedExperience && job.maxExp >= filters.selectedExperience);
            const workTypeMatch = !filters.workType || job.location === filters.workType;
            const locationMatch = !filters.selectedLocation || job.location === filters.selectedLocation;
            const basePayMatch = !filters.selectedBasePay || job.minJdSalary >= filters.selectedBasePay;
            const companyMatch = !company || job.companyName.toLowerCase() === company.toLowerCase();
            return roleMatch && experienceMatch && workTypeMatch && locationMatch && basePayMatch && companyMatch;
        });
        setFilteredJobsData(filteredData);
    };

    const renderSelectOptions = (options, label, field, labelWidth, disabled) => {
        return (
            <Box sx={{ width: labelWidth }}>
                <FormControl fullWidth>
                    <InputLabel id={`${field}-label`}>{label}</InputLabel>
                    <Select
                        labelId={`${field}-label`}
                        id={`${field}-select`}
                        value={filters[field]}
                        label={label}
                        onChange={(event) => handleFilterChange(field, event.target.value)}
                        disabled={disabled}
                    >
                        {options.map((option, index) =>
                            <MenuItem key={index} value={option}>{option}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Box>
        );
    };

    return (
        <div className="filter-section">
            {renderSelectOptions(roles, "Role", "selectedRole", 150, false)} 
            {renderSelectOptions(experiences, "Experience", "selectedExperience", 150, false)}
            {renderSelectOptions(["remote", "on-site"], "Type", "workType", 150, filters.selectedLocation !== "")} 
            {renderSelectOptions(locations, "Location", "selectedLocation", 150, filters.workType !== "")}
            {renderSelectOptions(basePays, "Minimum Base Pay Salary", "selectedBasePay", 250, false)}
            <input 
                className="filter-company" 
                type="text" 
                placeholder="  Search Company Name"
                onChange={(e) => debounceSearch(e, debounceTimer)}
            />
            <button className="search-btn" type="button" onClick={handleSearch}>Search</button>
        </div>
    );
}
