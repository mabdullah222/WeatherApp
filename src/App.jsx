import React from 'react';
import Weather from './components/Weather';

const App = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(apiKey)
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Weather apiKey={apiKey}/>
    </div>
  );
};

export default App;
