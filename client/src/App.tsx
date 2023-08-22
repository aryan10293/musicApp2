import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginDisplay from './pages/LoginDisplay';
import RegisterDisplay from './pages/RegisterDisplay';
import DashboardDisplay from './pages/DashboardDisplay';
import ElectronicDisplay from './pages/ElectronicDisplay';
import HiphopDisplay from './pages/HiphopDisplay';
import AlternativeDisplay from './pages/AlternativeDisplay';
import ExploreDisplay from './pages/ExploreDisplay';
import TredningPlaylistDisp from './pages/TredningPlaylistDisp';
function App() {
  return (
      <Routes>
          <Route 
            path="/"
            element={ <LoginDisplay />  } />

          <Route 
            path="/register"
            element={ <RegisterDisplay />  } />

            <Route
              path="/dashboard"
              element={<DashboardDisplay />} />

          <Route 
            path="/electronic"
            element={ <ElectronicDisplay />  } />

          <Route 
            path="/hiphoprap"
            element={ <HiphopDisplay />  } />

          <Route 
            path="/alternative"
            element={ <AlternativeDisplay />  } />

          <Route 
            path="/explore"
            element={ <ExploreDisplay />  } />

          <Route 
          path="/explore/trendingplaylist"
          element={ <TredningPlaylistDisp />  } />            
      </Routes>
  );
}

export default App;
