import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { StoreProvider } from './lib/context';
import 'typeface-roboto';
import Routes from './routes';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Routes />
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
