import React from 'react';
import Home from './pages/home/home';
import ConfigContext from './context/configContext';
import config from './config.json';

function App() {
  return (
    <ConfigContext.Provider value={config}>
      <Home />
    </ConfigContext.Provider>
  );
}

export default App;
