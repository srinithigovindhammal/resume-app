import React from 'react';
import ResumeForm from './components/ResumeForm';
import ResumeList from './components/ResumeList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <ResumeForm />
      <ResumeList />
    </div>
  );
}

export default App;
