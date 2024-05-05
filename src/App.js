import React from 'react';
import { DataProvider } from './Components/DataContext';
import './App.css';
import FilterSection from './Components/FilterSection';
import JobCard from './Components/JobCard';
function App() {
  
  return (
    <DataProvider>
      <div className="App">
        <FilterSection/>
        <JobCard/>
      </div>
    </DataProvider>
    
  );
}

export default App;
