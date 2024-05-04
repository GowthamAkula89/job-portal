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
const locations = ['delhi ncr', 'mumbai', 'remote', 'chennai', 'bangalore'];
const basePays = [10, 20, 30, 40, 50, 60, 70, 80];

export default function FilterSection() {
    const { jobsData } = useContext(DataContext);
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

    const renderSelectOptions = (options, label, field, labelWidth) => {
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
            {renderSelectOptions(roles, "Role", "selectedRole", 150)} 
            {renderSelectOptions(experiences, "Experience", "selectedExperience", 150)}
            {renderSelectOptions(["Remote", "on-site"], "Type", "workType", 150)} 
            {renderSelectOptions(locations, "Location", "selectedLocation", 150)}
            {renderSelectOptions(basePays, "Minimum Base Pay Salary", "selectedBasePay", 250)}
            <input className="filter-company" type="text" placeholder="  Search Company Name"/>
            <button className="search-btn">Search</button>
        </div>
    );
}
