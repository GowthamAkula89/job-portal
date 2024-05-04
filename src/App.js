import React from 'react';
import { DataProvider } from './Components/DataContext';
import './App.css';
import FilterSection from './Components/FilterSection';
function App() {
  return (
    <DataProvider>
      <div className="App">
        <FilterSection/>
      </div>
    </DataProvider>
    
  );
}

export default App;
