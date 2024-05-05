import React from 'react';
import { DataProvider } from './Components/DataContext';
import './App.css';
import FilterSection from './Components/FilterSection';
import JobsSection from './Components/JobsSection';
function App() {
  return (
    <DataProvider>
      <div className="App">
        <FilterSection/>
        <JobsSection/>
      </div>
    </DataProvider>
    
  );
}

export default App;
