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
import ArtistDisplay from './pages/ArtistDisplay';
import AlbumDisplay from './pages/AlbumDisplay';
import PlaylistDisplay from './pages/PlaylistDisplay';
function App() {
  return (
      <Routes>
          <Route 
            path="/"
            element={ <LoginDisplay />  } />

          <Route 
            path="/artist/:id"
            element={ <ArtistDisplay />  } />

          <Route 
            path="/artist/:id/albums"
            element={ <AlbumDisplay />  } />


          <Route 
            path="/artist/:id/playlist"
            element={ <PlaylistDisplay />  } />

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
