import React from 'react';
import Home from './pages/home/home';
import ConfigContext from './context/configContext';
import ThemeContext, { theme } from './context/themeContext';
import config from './config.json';

function App() {
  return (
    <ConfigContext.Provider value={config}>
      <ThemeContext.Provider value={theme}>
        <Home />
      </ThemeContext.Provider>
    </ConfigContext.Provider>
  );
}

export default App;
