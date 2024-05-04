import React from 'react';
import { DataProvider } from './Components/DataContext';
import './App.css';
function App() {
  return (
    <DataProvider>
        <div>hi</div>
    </DataProvider>
    
  );
}

export default App;
