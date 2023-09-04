import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardDisplay from './pages/DashboardDisplay';
import ElectronicDisplay from './pages/ElectronicDisplay';
import HiphopDisplay from './pages/HiphopDisplay';
import AlternativeDisplay from './pages/AlternativeDisplay';
import ExploreDisplay from './pages/ExploreDisplay';
import TredningPlaylistDisp from './pages/TredningPlaylistDisp';
import ArtistDisplay from './pages/ArtistDisplay';
import AlbumDisplay from './pages/AlbumDisplay';
import PlaylistDisplay from './pages/PlaylistDisplay';
import RepostDisplay from './pages/RepostDisplay';
function App() {
  return (
      <Routes>

          <Route 
            path="/artist/:id"
            element={ <ArtistDisplay />  } />

          <Route 
            path="/artist/:id/albums"
            element={ <AlbumDisplay />  } />

            <Route 
            path="/artist/:id/repost"
            element={ <RepostDisplay />  } />


          <Route 
            path="/artist/:id/playlist"
            element={ <PlaylistDisplay />  } />


          <Route
              path="/"
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
